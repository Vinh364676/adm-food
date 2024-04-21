import { Card, Col, DatePicker, Form, Input, Row, notification } from "antd";
import { ROUTE_PATHS } from "../../../../constants/url-config";
import { useEffect, useState } from "react";
import ButtonFeat from "../../../button-feat/ButtonFeat";
import moment from "moment"; // Import Moment

import axios from "axios";

type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};

interface Item {
  id: number;
  code: string;
  value: string;
  startDate: string;
  endDate: string;
  status: string;
}

const VoucherForm = ({ isEdit = false, selected }: Prop) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState<any>({});
console.log('====================================');
console.log("initialFormValues",initialFormValues.code);
console.log('====================================');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://viviepi-food-app-api.onrender.com/voucher/api/get/all");
        if (response.status !== 200) {
          throw new Error("Lỗi kết nối mạng hoặc phản hồi không thành công");
        }
        const data = response.data.data;
        setItems(data);

        if (isEdit && selected) {
          const selectedVoucherData = data.find((voucher: Item) => voucher.id === parseInt(selected.id));
          if (selectedVoucherData) {
            const normalizedData = normalizeDateValues(selectedVoucherData);
            setInitialFormValues(normalizedData);
          }
        }
      } catch (error) {
        console.error(error);
        // Handle error here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEdit, selected]);

  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Tạo thành công",
      duration: 3,
    });
  };

  const onFinish = (values: any) => {
    // Handle form submission
  };

  const normalizeDateValues = (data: any) => {
    if (data && data.startDate && data.endDate) {
      return {
        ...data,
        startDate: moment(data.startDate),
        endDate: moment(data.endDate),
      };
    }
    return data;
  };

  const handleCreateNew = () => {
    // Handle creating a new voucher
  };

  return (
    <Form
      className="form__product"
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={initialFormValues} 
    >
      <Card title="Thông tin khuyến mãi" className="form__product__card">
        <Row gutter={[20, 0]}>
          <Col xl={12}>
          <Form.Item
  name="code" // Tên trường dữ liệu
  initialValue={initialFormValues.code} // Giá trị ban đầu
  rules={[
    {
      required: true,
      message: "Vui lòng nhập mã khuyến mãi!",
    },
  ]}
>
  <Input allowClear placeholder="Mã khuyến mãi" className="brand__form__input" />
</Form.Item>

          </Col>
          <Col xl={12}>
            <Form.Item
              name="value"
              initialValue={initialFormValues.value}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiền khuyến mãi!",
                },
              ]}
            >
              <Input allowClear type="number" placeholder="Tiền khuyến mãi" className="brand__form__input" />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              name="startDate"
              initialValue={initialFormValues.startDate}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày bắt đầu!",
                },
              ]}
            >
              <DatePicker
                className="brand__form__input brand__form__input__date"
                placeholder="Ngày bắt đầu"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              name="endDate"
              initialValue={initialFormValues.endDate}
              dependencies={["startDate"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày kết thúc!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const startDate = getFieldValue("startDate");

                    if (!startDate || !value || value.isAfter(startDate)) {
                      return Promise.resolve();
                    }

                    return Promise.reject("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
                  },
                }),
              ]}
            >
              <DatePicker
                className="brand__form__input brand__form__input__date"
                placeholder="Ngày kết thúc"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Form.Item className="brand__form__buttonGroup">
        <ButtonFeat
          link={ROUTE_PATHS.Voucher}
          onCreateNew={handleCreateNew}
          handleName={isEdit ? "Lưu" : "Tạo mới"}
        />
      </Form.Item>
    </Form>
  );
};

export default VoucherForm;
