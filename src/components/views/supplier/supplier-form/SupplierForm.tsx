import { Button, Card, Col, Form, Input, Row, message, notification } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import ButtonCustom from "../../../button-custom/ButtonCustom";
import "./SupplierForm.scss";
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
import { createSupplier, getSupplier, updateSupplier } from "../../../../redux/slices/supplier";

type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};
const handleCreateNew = () => {};
const SupplierForm = ({ isEdit = false, selected }: Prop) => {
  const { supplierList } = useSelector((state) => state.supplier);
  useEffect(() => {
    dispatch(
      getSupplier({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  
console.log(selected);

const selectedSupplierData = selected
  ? supplierList.find((supplier) => supplier.id === parseInt(selected.id))
  : undefined;
    console.log('====================================');
    console.log(selectedSupplierData);
    console.log('====================================');
  const onFinish = (values: any) => {
    const { name } = values;

    if (isEdit && selected) {
      if (
        supplierList.some(
          (supplier) => supplier.name === name && supplier.id !== parseInt(selected.id, 10)
        )
      ) {
        notification.error({
          className: "notification__item notification__item--error",
          message: "Tên nhà cung cấp đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(updateSupplier({ id: selected.id, name: values.name, address:values.address, phoneNumber: values.phoneNumber, email: values.email  }))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Cập nhật thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/supplier";
            }, 3000);
          })
          .catch((error) => {
            console.error("Error updating brand:", error);
            notification.error({
              className: "notification__item",
              message: "Lỗi1",
              duration: 3,
            });
          });
      }
    } else if (!isEdit) {
      if (supplierList.some((brand) => brand.name === name)) {
        // Kiểm tra xem tên thương hiệu đã tồn tại khi tạo mới
        notification.error({
          className: "notification__item notification__item--error",
          message: "Tên thương hiệu đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(createSupplier(values))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Tạo thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/supplier";
            }, 3000);
          })
          .catch((error) => {
            console.error("Error creating brand:", error);
            notification.error({
              className: "notification__item",
              message: "Lỗi2",
              duration: 3,
            });
          });
      }
    }
  };

  return (
    <Form
    className="form__product"
      name="basic"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={isEdit ? selectedSupplierData : {}}
    >
         <Card title="Thông tin nhà cung cấp" className="form__product__card">
         <Row gutter={[20,0]}>
            <Col xl={12}>
            <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên nhà cung cấp!",
          },
        ]}
      >
        <Input
          placeholder="Tên nhà cung cấp"
          className="brand__form__input"
         // defaultValue={initialValue}
        />
      </Form.Item>
            </Col>
            <Col xl={12}>
            <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ!",
          },
        ]}
      >
        <Input
          placeholder="Địa chỉ"
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
                return Promise.reject("Số điện thoại phải bắt đầu bằng 0 và đủ 10 hoặc 11 số!");
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          placeholder="Điện thoại"
          className="brand__form__input"
        //  defaultValue={initialValue}
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
          placeholder="Email"
          className="brand__form__input"
        //  defaultValue={initialValue}
        />
      </Form.Item>
            </Col>
        </Row>
         </Card>
        
      
      <Form.Item className="brand__form__buttonGroup">
       <ButtonFeat link={ROUTE_PATHS.Supplier}
            onCreateNew={handleCreateNew} handleName={isEdit ? "Lưu" : "Tạo mới"}/>
      </Form.Item>
    </Form>
  );
};
export default SupplierForm;
