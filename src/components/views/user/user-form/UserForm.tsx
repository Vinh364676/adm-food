import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Select,
    message,
    notification,
  } from "antd";
  import { Link, useHistory, useParams } from "react-router-dom";
  import ButtonCustom from "../../../button-custom/ButtonCustom";
  import { ROUTE_PATHS } from "../../../../constants/url-config";
  import { dispatch, useDispatch, useSelector } from "../../../../redux/store";
  import {
    createBrand,
    getBrand,
    getByIdBrand,
    updateBrand,
  } from "../../../../redux/slices/brand";
  import { useEffect, useState } from "react";
  import ButtonFeat from "../../../button-feat/ButtonFeat";
  import {
    createSupplier,
    getSupplier,
    updateSupplier,
  } from "../../../../redux/slices/supplier";
  import moment from "moment";
  import { getUser, updateUser } from "../../../../redux/slices/user";
  import accountService from "../../../../services/account/account.service";
  import { getCustomer, updateCustomer } from "../../../../redux/slices/customer";
  type Prop = {
    isEdit?: boolean;
    selected?: { id: string } | null;
  };
  const handleCreateNew = () => {};
  const UserForm = ({ isEdit = false, selected }: Prop) => {
      const { userList } = useSelector((state) => state.user);
    useEffect(() => {
      dispatch(getUser({ pageIndex: 1,pageSize: 100,}));
    }, []);
  
    console.log(selected);
  
  //   const selectedSupplierData = selected
  //     ? supplierList.find((supplier) => supplier.id === parseInt(selected.id))
  //     : undefined;
  //   console.log("====================================");
  //   console.log(selectedSupplierData);
  //   console.log("====================================");
  const selectedUserData = selected
  ? userList.find((user) => user.id === parseInt(selected.id))
  : undefined;

    const onFinish = async (values: any) => {
      
      if (isEdit && selected) {
        dispatch(updateUser({ id: selected.id, password: values.password, phoneNumber:values.phoneNumber, displayName: values.displayName, email: values.email,roleId:values.roleId}))
            .unwrap()
            .then((response) => {
              notification.success({
                className: "notification__item",
                message: "Cập nhật thành công",
                duration: 3,
              });
              setTimeout(function () {
                window.location.href = "/user";
              }, 3000);
            })
      }
      else{
        try {
  
          const isEmailExists = userList.some(
            (user) => user.email === values.email
          );
          const isDisplayNameExists = userList.some(
            (user) => user.displayName === values.displayName
          );
    
          if (isEmailExists) {
            // Display error notification and return without making the API call
            notification.error({
              className: "notification__item notification__item--error",
              message: "Lỗi",
              description: "Email đã tồn tại. Vui lòng chọn thông tin khác.",
              duration: 3,
            });
          } else if (isDisplayNameExists) {
            // Display error notification and return without making the API call
            notification.error({
              className: "notification__item notification__item--error",
              message: "Lỗi",
              description:
                "Tên đăng nhập đã tồn tại. Vui lòng chọn thông tin khác.",
              duration: 3,
            });
          } else {
            // Proceed with registration if email and displayName are unique
            const registerData = {
              firstName: values.firstName,
              lastName: values.lastName,
              gender: values.gender,
              displayName: values.displayName,
              phoneNumber: values.phoneNumber,
              dateOfBirth: values.dateOfBirth,
              email: values.email,
              password: values.password,
              address: "",
            };
    
            console.log("Before API call");
            const response = await accountService.register(registerData);
            notification.success({
              className: "notification__item",
              message: "Đăng ký thành công",
              // description:
              //   "Tên đăng nhập đã tồn tại. Vui lòng chọn thông tin khác.",
              duration: 3,
            });
            setTimeout(function () {
                window.location.href = "/user";
              }, 3000);
            console.log("After API call");
            console.log(response); // Log the API response for debugging
    
            // Optionally, handle the success response here
          }
        } catch (error) {
          // Handle exceptions
          console.error(error);
          notification.error({
            message: "Lỗi",
            description:
              "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.",
          });
        } finally {
          
      }
     
      }
    };
    const [selectedStatus, setSelectedStatus] = useState(null);
    const handleSelectChange = (value:any) => { 
      setSelectedStatus(value);
    };
    return (
      <Form
        className="form__product"
        name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={isEdit ? selectedUserData:{}}
      >
        <Card title="Tài khoản khách hàng" className="form__product__card">
        <Row gutter={[20, 0]}>
          <Col xl={12}>
            <Form.Item
              name="displayName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập!",
                },
              ]}
            >
              <Input
              allowClear
                placeholder="Tên đăng nhập"
                className="brand__form__input"
                // defaultValue={initialValue}
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // Sử dụng biểu thức chính quy để kiểm tra email
                    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                    if (value && !emailRegex.test(value)) {
                      return Promise.reject("Email không hợp lệ! Vd:abc@abc.com");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
              allowClear
                placeholder="Email"
                className="brand__form__input"
                //  defaultValue={initialValue}
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
              allowClear
                placeholder="Mật khẩu"
                className="brand__form__input"
                //  defaultValue={initialValue}
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      // Sử dụng biểu thức chính quy để kiểm tra số điện thoại
                      const phoneRegex = /^0\d{9,10}$/;
                      if (value && !phoneRegex.test(value)) {
                        return Promise.reject(
                          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 hoặc 11 số!"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                allowClear
                  placeholder="Điện thoại"
                  className="brand__form__input"
                  //  defaultValue={initialValue}
                />
              </Form.Item>
            </Col>
        </Row>
      </Card> 

      {isEdit? <Card title="Cấp quyền" className="form__product__card">
        <Row gutter={[20, 0]}>
          <Col xl={24}>
            <Form.Item
              name="roleId"
            >
             <Select
            placeholder="Cấp quyền"
            className="select__order"
            onChange={handleSelectChange}
          value={selectedStatus}
          >
            <Select.Option value="1" >Admin</Select.Option>
            <Select.Option value="4">Quản lý</Select.Option>
            <Select.Option value="3">Nhân viên</Select.Option>
          </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card> :null}
          {isEdit ? null :<Card title="Thông tin khách hàng" className="form__product__card">
          <Row gutter={[20, 0]}>
            <Col xl={12}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên lót!",
                  },
                ]}
              >
                <Input
                allowClear
                  placeholder="Họ và tên lót"
                  className="brand__form__input"
                  // defaultValue={initialValue}
                />
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên!",
                  },
                ]}
              >
                <Input
                allowClear
                  placeholder="Tên"
                  className="brand__form__input"
                  //  defaultValue={initialValue}
                />
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Row>
                <Col xl={8}>
                  <Form.Item name="gender" className="form__custom">
                    <Radio.Group defaultValue={0} className="signUp__radio">
                      <Radio value={0}>Nam</Radio>
                      <Radio value={1}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xl={16}>
                  <Form.Item
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày sinh!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const currentDate = moment();
                          if (value && value.isSameOrAfter(currentDate, "day")) {
                            return Promise.reject(
                              "Ngày sinh không được lớn hơn hoặc bằng ngày hiện tại"
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <DatePicker
                      placeholder="Ngày sinh"
                      className="form__date"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xl={12}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      // Sử dụng biểu thức chính quy để kiểm tra số điện thoại
                      const phoneRegex = /^0\d{9,10}$/;
                      if (value && !phoneRegex.test(value)) {
                        return Promise.reject(
                          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 hoặc 11 số!"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                allowClear
                  placeholder="Điện thoại"
                  className="brand__form__input"
                  //  defaultValue={initialValue}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>}
        <Form.Item className="brand__form__buttonGroup">
          <ButtonFeat
            link={ROUTE_PATHS.User}
            onCreateNew={handleCreateNew}
            handleName={isEdit ? "Lưu" : "Tạo mới"}
          />
        </Form.Item>
      </Form>
    );
  };
  export default UserForm;
  