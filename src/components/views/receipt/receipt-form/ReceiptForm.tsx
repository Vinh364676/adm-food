import { Button, Card, Col, Form, Input, Row, Select, message, notification } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import ButtonCustom from "../../../button-custom/ButtonCustom";
import "./ReceiptForm.scss";
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
import { getProduct } from "../../../../redux/slices/product";
import { createReceipt } from "../../../../redux/slices/receipt";

type Prop = {
  isEdit?: boolean;
  selected?: { id: string } | null;
};

const handleCreateNew = () => {};
const ReceiptForm = ({ isEdit = false, selected }: Prop) => {
  const { supplierList } = useSelector((state) => state.supplier);
  const { productList } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(
      getSupplier({
        pageIndex: 1,
        pageSize: 100,
      })
    );
    dispatch(
        getProduct({
          pageIndex: 1,
          pageSize: 100,
        })
      );
  }, []);
  
console.log(selected);
const showNotification = () => {
  notification.success({
    className: "notification__item",
    message: "Tạo thành công",
    //   description: 'Sản phẩm đã được xóa thành công!',
    duration: 3,
  });
};
const showNotificationError = () => {
  notification.error({
    className: "notification__item",
    message: "Tạo thất baị",
    //   description: 'Sản phẩm đã được xóa thành công!',
    duration: 3,
  });
};
const handleCreateNew = () => {
  showNotification();
  setTimeout(function () {
    window.location.href = "/receipt";
  }, 3000);
};
const selectedSupplierData = selected
  ? supplierList.find((supplier) => supplier.id === parseInt(selected.id))
  : undefined;
    console.log('====================================');
    console.log(selectedSupplierData);
    console.log('====================================');
  const [additionalRows, setAdditionalRows] = useState<JSX.Element[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const handleAddDetail = () => {
    const handleProductSelect = (productId:any) => {
      // Add the selected productId to the array
      setSelectedIds([...selectedIds, productId]);
    };
    const newRow = (
      <Row key={additionalRows.length} gutter={[20, 0]}>
        <Col xl={12}>
          <Form.Item
            name={`receiptDetails[${additionalRows.length}].productId`}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên nhà cung cấp!",
              },
            ]}
          >
            <Select
              placeholder="Sản phẩm"
              className="form__product__card__select "
              onSelect={handleProductSelect}
            >
              {productList
                .filter((product) => !selectedIds.includes(product.id))
                .map((product) => (
                  <Select.Option key={product.id} value={product.id}>
                    {product.productName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xl={12}>
        <Row gutter={[24, 0]}>
  <Col xl={12}>
    <Form.Item
      name={`receiptDetails[${additionalRows.length}].quantity`}
      rules={[
        {
          required: true,
          message: "Vui lòng nhập số lượng!",
        },
        {
          validator: (_, value) => value > 0 ? Promise.resolve() : Promise.reject('Số lượng phải lớn hơn 0!'),
        },
      ]}
    >
      <Input placeholder="Số lượng" className="brand__form__input" />
    </Form.Item>
  </Col>
  <Col xl={12}>
    <Form.Item
      name={`receiptDetails[${additionalRows.length}].price`}
      rules={[
        {
          required: true,
          message: "Vui lòng nhập giá nhập!",
        },
        {
          validator: (_, value) => value > 0 ? Promise.resolve() : Promise.reject('Giá nhập phải lớn hơn 0!'),
        },
      ]}
    >
      <Input placeholder="Giá nhập" className="brand__form__input" />
    </Form.Item>
  </Col>
</Row>

        </Col>
      </Row>
    );
  
    setAdditionalRows([...additionalRows, newRow]);
  };
  
  const onFinish = (values: any) => {
    console.log('Form values:', values);

    const receiptDetails: any[] = [];
    let index = 0;

    // Loop through receiptDetails indexes until the next one is not found
    while (`receiptDetails[${index}].productId` in values) {
      const detail = {
        productId: values[`receiptDetails[${index}].productId`],
        quantity: values[`receiptDetails[${index}].quantity`],
        price: values[`receiptDetails[${index}].price`],
      };

      receiptDetails.push(detail);
      index += 1;
    }

    const payload = {
      supplierId: values.supplierId,
      receiptDetails: receiptDetails,
    };

    console.log('Final payload:', payload);
    try {
       dispatch(createReceipt(payload));
       handleCreateNew()
      console.log('Receipt created successfully!');
      
    } catch (error) {
      showNotificationError()
      console.error('Error creating receipt:', error);
    
    }

  };
  const handleDemo = () =>{

  }
  return (
<Form
      className="form__product"
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={isEdit ? selectedSupplierData : {}}
    >
      <Card title="Thông tin hóa đơn" className="form__product__card">
        <Row gutter={[20, 0]}>
          <Col xl={24}>
            <Form.Item
              name="supplierId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà cung cấp!",
                },
              ]}
            >
              <Select
                placeholder="Nhà cung cấp"
                className="form__product__card__select"
              >
                {supplierList.map((supplier) => (
                  <Select.Option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Chi tiết hóa đơn" className="form__product__card">
        {additionalRows.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
        <Button style={{marginBottom:10}} onClick={handleAddDetail} className="buttonCustom">Thêm chi tiết</Button>
      </Card>
      <Form.Item className="brand__form__buttonGroup">
        <ButtonFeat
          link={ROUTE_PATHS.Supplier}
          onCreateNew={handleDemo}
          handleName={isEdit ? "Lưu" : "Tạo mới"}
        />
      </Form.Item>
    </Form>

  );
};
export default ReceiptForm;
