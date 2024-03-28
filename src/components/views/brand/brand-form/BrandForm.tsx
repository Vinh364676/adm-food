import { Button, Form, Input, message, notification } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import ButtonCustom from "../../../button-custom/ButtonCustom";
import "./BrandForm.scss";
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

type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};
const handleCreateNew = () => {};
const BrandForm = ({ isEdit = false, selected }: Prop) => {
  const { brandList } = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(
      getBrand({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  console.log(selected);
    const selectedBrand = selected
    ? brandList.find((brand) => brand.id === parseInt(selected.id))
    : undefined;
    console.log("selectedBrandName",selectedBrand);
    // const initialValue = isEdit && selected ? selectedBrandName : undefined;

  const onFinish = (values: any) => {
    const { name } = values;

    if (isEdit && selected) {
      if (
        brandList.some(
          (brand) => brand.name === name && brand.id !== parseInt(selected.id, 10)
          
        )
      ) {
        notification.error({
          className: "notification__item notification__item--error",
          message: "Tên thương hiệu đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(updateBrand({ id: selected.id, name: values.name }))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Cập nhật thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/brand";
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
      if (brandList.some((brand) => brand.name === name)) {
        // Kiểm tra xem tên thương hiệu đã tồn tại khi tạo mới
        notification.error({
          className: "notification__item notification__item--error",
          message: "Tên thương hiệu đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(createBrand(values))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Tạo thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/brand";
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
      className="brand__form"
      name="basic"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={isEdit ? selectedBrand : {}}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên thương hiệu!",
          },
        ]}
      >
        <Input
          placeholder="Tên thương hiệu"
          className="brand__form__input"
          // defaultValue={initialValue}
        />
      </Form.Item>
      <Form.Item className="brand__form__buttonGroup">
       <ButtonFeat link={ROUTE_PATHS.Brand}
            onCreateNew={handleCreateNew} handleName={isEdit ? "Lưu" : "Tạo mới"}/>
      </Form.Item>
    </Form>
  );
};
export default BrandForm;
