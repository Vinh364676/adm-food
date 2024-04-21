import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ProductForm.scss";
import { ROUTE_PATHS } from "../../../../constants/url-config";
import ButtonFeat from "../../../button-feat/ButtonFeat";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "../../../loading/loadingComponent";
type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};
interface Items {
  id: number;
  name: string;
  status: string;
  bannerUrl: string;
}
const ProductForm = ({ isEdit = false, selected }: Prop) => {
  const [form] = Form.useForm();
  const [thumnail, setThumnail] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Items[]>([]);
  useEffect(() => {
    fetch("https://viviepi-food-app-api.onrender.com/categories/api/get/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi kết nối mạng hoặc phản hồi không thành công");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data.data);
      })
      .catch(() => {});
  }, []);
  //thong bao
  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Tạo thành công",
      duration: 3,
    });
  };
  const handleTest = () => {};
  const selectData = selected
    ? items.find((product) => product.id === parseInt(selected.id))
    : undefined;
  console.log("====================================");
  console.log(selectData);
  console.log("====================================");
  const onFinish = (formData: any) => {
    setLoading(true);
    const url = "https://viviepi-food-app-api.onrender.com/food/api";

    if (isEdit && selectData) {
      const formDataUpdate = new FormData();
      // Assuming you have a productId in selectData
      formDataUpdate.append("id", selectData.id.toString());
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

      axios
        .put(`${url}/Update`, formDataUpdate)
        .then((response) => {
          console.log(response.data);
          showNotification();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const formDataSubmit = new FormData();
      formDataSubmit.append("name", formData.name);
      formDataSubmit.append("description", formData.description);
      formDataSubmit.append("quantity", formData.quantity);
      formDataSubmit.append("price", formData.price);
      formDataSubmit.append("categoryId", formData.category);
      formDataSubmit.append("file", thumnail);
      axios
        .post(`${url}/insert`, formDataSubmit)
        .then((response) => {
          console.log(response.data);
          showNotification();
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      {loading && <LoadingComponent />}
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
        autoComplete="off"
        className="form__product"
      >
        <Card title="Thông tin sản phẩm" className="form__product__card">
          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
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
                <Input
                  placeholder="Mô tả sản phẩm"
                  className="form__product__card__input"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng!",
                  },
                ]}
              >
                <Input
                  placeholder="Số lượng"
                  className="form__product__card__input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá tiền",
                  },
                ]}
              >
                <Input
                  placeholder="Giá tiền"
                  className="form__product__card__input"
                />
              </Form.Item>
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
                  defaultValue={isEdit ? selectData?.id : undefined}
                >
                  {items.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="file"
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
                    return false;
                  }}
                >
                  <Button
                    className="form-profile__upload form__product__card__input"
                    size="large"
                  >
                    Tải lên
                    <UploadOutlined />
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
