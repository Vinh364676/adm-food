import { Button, Form, Input, message, notification } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import ButtonCustom from "../../../button-custom/ButtonCustom";
import { ROUTE_PATHS } from "../../../../constants/url-config";
import { dispatch, useDispatch, useSelector } from "../../../../redux/store";
import { useEffect, useState } from "react";
import "./CategoryForm.scss";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../../../redux/slices/category";
type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};
const CategoryForm = ({ isEdit = false, selected }: Prop) => {
  const { categoryList } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(
      getCategory({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  const selectedCategory = selected
  ? categoryList.find((category) => category.id === parseInt(selected.id))
  : undefined;
  console.log(selectedCategory);

  const onFinish = (values: any) => {
    const { name } = values;

    if (isEdit && selected) {
      if (
        categoryList.some(
          (category) => category.name === name && category.id !== parseInt(selected.id, 10)
        )
      ) {
        notification.error({
          className: "notification__item notification__item--error",
          message: "Tên danh mục đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(updateCategory({ id: selected.id, name: values.name }))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Cập nhật thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/category";
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
      if (categoryList.some((category) => category.name === name)) {
        // Kiểm tra xem tên thương hiệu đã tồn tại khi tạo mới
        notification.error({
          className: "notification__item notification__item--error",
          message: "Tên danh mục đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(createCategory(values))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Tạo thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/category";
            }, 3000);
          })
          .catch((error) => {
            console.error("Error creating category:", error);
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
      className="category__form"
      name="basic"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={isEdit ? selectedCategory : {}}
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
          placeholder="Tên danh mục"
          className="category__form__input"
          // defaultValue={initialValue}
        />
      </Form.Item>
      <Form.Item className="category__form__buttonGroup">
        <Button
          type="primary"
          htmlType="button"
          className="category__form__buttonGroup__button category__form__buttonGroup__button--cancel"
        >
          <Link to={ROUTE_PATHS.Category}>Quay lại</Link>
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="category__form__buttonGroup__button "
        >
          Tạo mới
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CategoryForm;
