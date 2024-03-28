import React, { useEffect, useState } from "react";
import { Button, Card, Col, DatePicker, Input, Pagination, Row, Switch, Table } from "antd";
import productImg from "../../../../assets/images/product/product.svg";
import check from "../../../../assets/images/home/check.svg";
import returnImg from "../../../../assets/images/home/return.svg";
import historyImg from "../../../../assets/images/home/history.svg";
import {
  DeleteOutlined,
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  EllipsisOutlined

} from "@ant-design/icons";
import "./BestSale.scss";
import { dispatch, useSelector } from "../../../../redux/store";
import { getTopSell } from "../../../../redux/slices/product";
import { getBrand } from "../../../../redux/slices/brand";
import { getCategory } from "../../../../redux/slices/category";
import moment from "moment";
type Props = {};
const { RangePicker } = DatePicker;
const columns = [
    {
      title: "Id",
      dataIndex: "productId",
      width:60
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      render: (text: any, record: any) => (
        <span>
          <img
          className="img__sell"
            src={record.thumbnail}  
            alt={text}
            style={{
              background: "#F1F5F9",
              padding: "6px",
              borderRadius: "12px",
              marginRight: "8px",
              width:"50px",
              height:"50px"
            }}
          />
          {text}
        </span>
      ),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
   
  ];
 
const BestSale = (props: Props) => {
    const {productList} = useSelector(state=>state.product);
    const {brandList} = useSelector(state=>state.brand);
    const {categoryList} = useSelector(state=>state.category);
  useEffect(() => {
    dispatch(getTopSell({pageIndex: 1,pageSize: 100,}));
    dispatch(getBrand({pageIndex: 1,pageSize: 100,}));
    dispatch(getCategory({pageIndex: 1,pageSize: 100,}));
  }, []);
   
  const data = productList.map((product, index) => {
    const brand = brandList.find((brand) => brand.id === product.brandId);
    const category = categoryList.find((category) => category.id === product.categoryId);
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(product.price);
    
    return {
      key: index,
      product: product.productName,
      productId: product.id,
      quantity: product.quantity,
      price: formattedPrice,
      brand: brand ? brand.name : '',
      category: category ? category.name : '',
      thumbnail: product.thumnail,
    };
  });
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="layoutBest">
    <div className="bestSale">
      <Row className="bestSale__header">
        <h5 className="bestSale__header__title">Best Selling</h5>
        <RangePicker bordered={false}  format="DD/MM/YYYY"/>
      </Row>
      <Table
        className="bestSale__table"
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        
      />
    </div>
    <div className="cardHistory">

        <Card style={{width:359}}>
            <div className="cardHistory__header">
                <h5 className="bestSale__header__title">Transaction history</h5>
                <EllipsisOutlined  className="bestSale__header__title"/>
            </div>
            <div className="cardHistory__layout">
                <div className="cardHistory--item">
                    <div className="cardHistory__content">
                        <img src={check} style={{background:"rgba(240, 253, 244, 1)"}} alt="" className="cardHistory__content--img" />
                        <div>
                            <h5 className="cardHistory__content--title">Payment from <span className="cardHistory__content--title--span">#1234</span></h5>
                            <p className="cardHistory__content--desc">Dec 23, 04:00 PM</p>
                        </div>
                    </div>
                    <div>
                        <p className="cardHistory__content--price">$421.00</p>
                    </div>
                </div>
                <div className="cardHistory--item">
                    <div className="cardHistory__content">
                        <img src={historyImg} style={{background:"rgba(255, 251, 235, 1)"}} alt="" className="cardHistory__content--img" />
                        <div>
                            <h5 className="cardHistory__content--title">Payment from <span className="cardHistory__content--title--span">#1234</span></h5>
                            <p className="cardHistory__content--desc">Dec 23, 04:00 PM</p>
                        </div>
                    </div>
                    <div>
                        <p className="cardHistory__content--price">$421.00</p>
                    </div>
                </div>
                <div className="cardHistory--item">
                    <div className="cardHistory__content">
                        <img src={returnImg} style={{background:"rgba(253, 242, 248, 1)"}} alt="" className="cardHistory__content--img" />
                        <div>
                            <h5 className="cardHistory__content--title">Payment from <span className="cardHistory__content--title--span">#1234</span></h5>
                            <p className="cardHistory__content--desc">Dec 23, 04:00 PM</p>
                        </div>
                    </div>
                    <div>
                        <p className="cardHistory__content--price">$421.00</p>
                    </div>
                </div>
                <div className="cardHistory--item">
                    <div className="cardHistory__content">
                        <img src={check} style={{background:"rgba(240, 253, 244, 1)"}} alt="" className="cardHistory__content--img" />
                        <div>
                            <h5 className="cardHistory__content--title">Payment from <span className="cardHistory__content--title--span">#1234</span></h5>
                            <p className="cardHistory__content--desc">Dec 23, 04:00 PM</p>
                        </div>
                    </div>
                    <div>
                        <p className="cardHistory__content--price">$421.00</p>
                    </div>
                </div>
            </div>
        </Card>
        </div>    
    </div>
  );
};
export default BestSale;
