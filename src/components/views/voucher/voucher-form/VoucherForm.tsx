import { Button, Card, Col, DatePicker, Form, Input, Row, message, notification } from "antd";
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
import { createSupplier, getSupplier, updateSupplier } from "../../../../redux/slices/supplier";
import { createVoucher, updateVoucher } from "../../../../redux/slices/voucher";
import moment from "moment";

type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};
const handleCreateNew = () => {};
const VoucherForm = ({ isEdit = false, selected }: Prop) => {
  const { voucherList } = useSelector((state) => state.voucher);
  useEffect(() => {
    dispatch(
      getSupplier({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  
console.log(selected);
const selectedVoucherData = selected
  ? voucherList.find((voucher) => voucher.id === parseInt(selected.id))
  : undefined;
    console.log('====================================');
    console.log(selectedVoucherData);
    console.log('====================================');
  const onFinish = (values: any) => {
    const { code } = values;
    
    if (isEdit && selected) {
      if (
        voucherList.some(
          (voucher) => voucher.code === code && voucher.id !== parseInt(selected.id, 10)
        )
      ) {
        notification.error({
          className: "notification__item notification__item--error",
          message: "Mã khuyến mã đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(updateVoucher({ id: selected.id, code: values.code, value:parseInt(values.value), startDate: values.startDate, endDate: values.endDate  }))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Cập nhật thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/voucher";
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
      if (voucherList.some((voucher) => voucher.code === code)) {
        // Kiểm tra xem tên thương hiệu đã tồn tại khi tạo mới
        notification.error({
          className: "notification__item notification__item--error",
          message: "Mã code đã tồn tại",
          duration: 3,
        });
      } else {
        dispatch(createVoucher(values))
          .unwrap()
          .then((response) => {
            notification.success({
              className: "notification__item",
              message: "Tạo thành công",
              duration: 3,
            });
            setTimeout(function () {
              window.location.href = "/voucher";
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
  
  const normalizeDateValues = (data:any) => {
    if (data && data.startDate && data.endDate) {
      return {
        ...data,
        startDate: moment(data.startDate), // Ensure it's a moment object
        endDate: moment(data.endDate),     // Ensure it's a moment object
      };
    }
    return data;
  };
  const initialFormValues = isEdit ? normalizeDateValues(selectedVoucherData) || {} : {};

  return (
      <Form
      className="form__product"
        name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={initialFormValues}
      >
         <Card title="Thông tin khuyến mãi" className="form__product__card">
         <Row gutter={[20,0]}>
            <Col xl={12}>
            <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã khuyến mãi!",
          },
        ]}
      >
        <Input
        allowClear
          placeholder="Mã khuyến mãi"
          className="brand__form__input"
         // defaultValue={initialValue}
        />
      </Form.Item>
            </Col>
            <Col xl={12}>
            <Form.Item
        name="value"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập phần trăm khuyến mãi!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const parsedValue = parseInt(value);
          
              if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 100) {
                return Promise.reject('Vui lòng nhập một số từ 1 đến 100');
              } else {
                return Promise.resolve();
              }
            },
          })
        ]}
      >
        <Input
        allowClear
        type="number" 
          placeholder="Phần trăm"
          className="brand__form__input"
          // defaultValue={initialValue}
        />
      </Form.Item>
            </Col>
            <Col xl={12}>
            <Form.Item
        name="startDate"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày bắt đầu!",
          },
         
        ]}
      >
       <DatePicker className="brand__form__input brand__form__input__date" placeholder="Ngày bắt đầu" format={"DD-MM-YYYY"}/>
          </Form.Item>
            </Col>
            <Col xl={12}>
        <Form.Item
          name="endDate"
          dependencies={['startDate']}
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày kết thúc!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const startDate = getFieldValue('startDate');

                if (!startDate || !value || value.isAfter(startDate)) {
                  return Promise.resolve();
                }

                return Promise.reject('Ngày kết thúc phải lớn hơn ngày bắt đầu!');
              },
            }),
          ]}
        >
          <DatePicker className="brand__form__input brand__form__input__date" placeholder="Ngày kết thúc" format={"DD-MM-YYYY"}/>
        </Form.Item>
      </Col>
        </Row>
         </Card>
        
      
      <Form.Item className="brand__form__buttonGroup">
       <ButtonFeat link={ROUTE_PATHS.Voucher}
            onCreateNew={handleCreateNew} handleName={isEdit ? "Lưu" : "Tạo mới"}/>
      </Form.Item>
    </Form>
  );
};
export default VoucherForm;
