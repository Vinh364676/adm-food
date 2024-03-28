import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ProductForm.scss";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../constants/url-config";
import ButtonFeat from "../../../button-feat/ButtonFeat";
import { dispatch, useSelector } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { getBrand } from "../../../../redux/slices/brand";
import { getCategory } from "../../../../redux/slices/category";
import { useForm } from "antd/lib/form/Form";
import { createProduct, getProduct } from "../../../../redux/slices/product";
import axios from "axios";
import { getAccessory } from "../../../../redux/slices/accessory";
type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};
const ProductForm = ({ isEdit = false, selected }: Prop) => {
  const { brandList } = useSelector((state) => state.brand);
  const { categoryList } = useSelector((state) => state.category);
  const [form] = Form.useForm();
  const [arrFile, setArrFile] = useState<any>([]);
  const [thumnail, setThumnail] = useState<any | null>(null);
  const [imageState, setImageState] = useState<any | null>(null);
  const { productList } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(
      getBrand({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getCategory({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getProduct({
        PageNumber: 1,
        PageSize: 100,
      })
    );
  }, []);
  // xu lu

  //thong bao
  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Tạo thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const handleTest = () => {

  }
  const handleCreateNew = () => {
    showNotification();
    // setTimeout(function () {
    //   window.location.href = "/product";
    // }, 3000);
  };
  const selectData = selected
  ? productList.find((product) => product.id === parseInt(selected.id))
  : undefined;
console.log('====================================');
console.log(selectData);
console.log('====================================');
const onFinish = (formData: any) => {
  const url = "https://localhost:7199/api/Product";

  if (isEdit && selectData) {
    const formDataUpdate = new FormData();
     // Assuming you have a productId in selectData
     formDataUpdate.append("Id", selectData.id.toString());
    formDataUpdate.append("ProductName", formData.productName);
    formDataUpdate.append("Price", formData.price);
    formDataUpdate.append("Quantity", formData.quantity);
    formDataUpdate.append("BrandId", formData.brand);
    formDataUpdate.append("Size", formData.size);
    formDataUpdate.append("Color", formData.color);
    formDataUpdate.append("Description", formData.description);
    formDataUpdate.append("Code", formData.code);
    formDataUpdate.append("Gender", formData.gender);
    formDataUpdate.append("Status", formData.status);
    formDataUpdate.append("CategoryId", formData.category);
    formDataUpdate.append("thumNail", thumnail);

    arrFile.forEach((file: any) => {
      formDataUpdate.append("images", file);
    });

    axios
      .put(`${url}/Update`, formDataUpdate)
      .then((response) => {
        console.log(response.data);
        handleCreateNew();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const formDataSubmit = new FormData();

    formDataSubmit.append("ProductName", formData.productName);
    formDataSubmit.append("Price", formData.price);
    formDataSubmit.append("Quantity", formData.quantity);
    formDataSubmit.append("BrandId", formData.brand);
    formDataSubmit.append("Size", formData.size);
    formDataSubmit.append("Color", formData.color);
    formDataSubmit.append("Description", formData.description);
    formDataSubmit.append("Code", formData.code);
    formDataSubmit.append("Gender", formData.gender);
    formDataSubmit.append("Status", formData.status);
    formDataSubmit.append("CategoryId", formData.category);
    formDataSubmit.append("thumNail", thumnail);
    
    arrFile.forEach((file: any) => {
      formDataSubmit.append("images", file);
    });

    axios
      .post(`${url}/Create`, formDataSubmit)
      .then((response) => {
        console.log(response.data);
        handleCreateNew();
         setTimeout(function () {
      window.location.href = "/product";
    }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
  
  return (
    <>
      <Form
        form={form}
        name="basic"
        requiredMark={"optional"}
        initialValues={isEdit ? selectData : {}}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form__product"
      >
        <Card title="Thông tin sản phẩm" className="form__product__card">
          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="productName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sản phẩm!",
                  },
                  {
                    validator: (_, value) => {
                      if (/^[0-9!@#$%^&*(),.?":{}|<>]/.test(value)) {
                        return Promise.reject(
                          "Tên sản phẩm không được bắt đầu bằng số hoặc ký tự đặc biệt!"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Tên sản phẩm"
                  className="form__product__card__input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={[20, 0]}>
                <Col xl={12}>
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn trạng thái sản phẩm!",
                      },
                    ]}
                  >
                    <Select
                      className="form__product__card__select"
                      placeholder="Chọn trạng thái sản phẩm"
                    >
                      <Select.Option value="1">Phổ biến</Select.Option>
                      <Select.Option value="2">Mới nhất</Select.Option>
                      <Select.Option value="3">Bán chạy</Select.Option>
                      <Select.Option value="4">Giảm giá</Select.Option>
                      <Select.Option value="5" disabled>
                        Hết hàng
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={12}>
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn giới tính!",
                      },
                    ]}
                    dependencies={["price"]}
                  >
                    <Select
                      className="form__product__card__select"
                      placeholder="Chọn giới tính"
                    >
                      <Select.Option value="male">Nam</Select.Option>
                      <Select.Option value="female">Nữ</Select.Option>
                      <Select.Option value="all">Tất cả</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[20, 0]}>
            <Col xl={12}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Mô tả sản phẩm"
                  className="form__product__card__input form__product__card__input--area"
                />
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Row gutter={[20, 0]}>
                {/* <Col span={12}>
                  <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá sản phẩm!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^[0-9]+$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Giá sản phẩm phải là số!");
                        },
                      }),
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value >= 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Giá sản phẩm không được âm!");
                        },
                      }),
                    ]}
                    dependencies={["price"]}
                  >
                    <Input
                      placeholder="Giá sản phẩm"
                      className="form__product__card__input"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng sản phẩm!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || /^[0-9]+$/.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "Số lượng sản phẩm phải là số!"
                          );
                        },
                      }),
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value >= 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "Số lượng sản phẩm không được âm!"
                          );
                        },
                      }),
                    ]}
                    dependencies={["price"]}
                  >
                    <Input
                      placeholder="Số lượng sản phẩm"
                      className="form__product__card__input"
                    />
                  </Form.Item>
                </Col> */}
                <Col span={24}>
                  <Form.Item
                    label="Kích thước"
                    name="size"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập kích thước sản phẩm!",
                      },
                      // {
                      //   validator: (rule, value) => {
                      //     const regex = /^[0-9]{2,3}(mm)$/;
                      //     if (regex.test(value)) {
                      //       return Promise.resolve();
                      //     }
                      //     return Promise.reject(
                      //       "Kích thước sản phẩm không hợp lệ. Ví dụ: 30mm,100mm..."
                      //     );
                      //   },
                      // },
                    ]}
                  >
                    <Input
                      placeholder="Kích thước sản phẩm"
                      className="form__product__card__input"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Màu sắc"
                    name="color"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập màu sắc sản phẩm!",
                      },
                    ]}
                  >
                    <Input
                      type="color"
                      placeholder="Màu sắc"
                      className="form__product__card__input"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card title="Chi tiết sản phẩm" className="form__product__card">
          <Row gutter={[20, 0]}>
            <Col xl={12}>
              <Form.Item
                label="Danh mục"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  className="form__product__card__select"
                 
                  defaultValue={isEdit ? selectData?.categoryId : undefined}
                >
                  {categoryList.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Form.Item
                label="Thương hiệu"
                name="brand"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thương hiệu",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn thương hiệu"
                  className="form__product__card__select"
                  defaultValue={isEdit ? selectData?.brandId : undefined}
                >
                  {brandList.map((brand) => (
                    <Select.Option key={brand.id} value={brand.id}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Hình ảnh sản phẩm" className="form__product__card">
  <Row gutter={[24, 0]}>
    <Col span={12}>
      <Form.Item
        label="Thumbnail"
        name="thumbnail"
        rules={[
          {
            required: true,
            message: "Vui lòng tải lên thumbnail.",
          },
        ]}
        initialValue={isEdit && thumnail ? [thumnail] : []}
      >
        <Upload
          accept=".png,.jpg,.pdf"
          maxCount={1}
          beforeUpload={(file) => {
            setThumnail(file);
            return false; // Prevent default upload behavior
          }}
        >
          <Button className="form-profile__upload" size="large">
            Tải lên
            <UploadOutlined />
          </Button>
        </Upload>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="Ảnh chi tiết"
        name="img"
        rules={[
          {
            required: true,
            message: "Vui lòng tải lên ảnh chi tiết.",
          },
        ]}
        initialValue={isEdit ? arrFile : []}
      >
        <Upload
          accept=".png,.jpg,.pdf"
          maxCount={4}
          beforeUpload={(file) => {
            const newList = [...arrFile, file];
            setArrFile(newList);
            setImageState(file);
            return false; // Prevent default upload behavior
          }}
        >
          <Button className="form-profile__upload" size="large">
            Tải lên
            <UploadOutlined />
            {/* <UploadIcon /> */}
          </Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>
</Card>


        <Form.Item className="brand__form__buttonGroup">
          <ButtonFeat
            link={ROUTE_PATHS.Product}
            onCreateNew={handleTest}
            handleName={isEdit ? "Lưu" : "Tạo mới"}
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default ProductForm;
