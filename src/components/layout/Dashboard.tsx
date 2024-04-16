import {
  UserOutlined,
  HomeOutlined,
  MailOutlined,
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined
  ,DatabaseOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Input,
  Layout,
  Menu,
  Modal,
  Popover,
  notification,
} from "antd";
import React, { useState } from "react";
import logo from "../../assets/icon/logo.png";
import "./Dashboard.scss";
import { ROUTE_PATHS } from "../../constants/url-config";
import { Link } from "react-router-dom";

import { LOCAL_STORAGE_KEYS } from "../../constants/local";
const { Header, Sider } = Layout;
const Dashboard = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);
  const content = (
    <div>
<div className="popover__content">
      <div className="popover__content__left">
      <div className="popover__content--cricle"></div>
      <div>
      <p>Phạm Quang Vinh</p>
      <p>Thông báo abcder</p>
      </div>
      </div>
      <div>
        2hr
      </div>
    </div>
    <div className="popover__content">
      <div className="popover__content__left">
      <div className="popover__content--cricle"></div>
      <div>
      <p>Phạm Quang Vinh</p>
      <p>Thông báo abcder</p>
      </div>
      </div>
      <div>
        2hr
      </div>
    </div>
    <div className="popover__content">
      <div className="popover__content__left">
      <div className="popover__content--cricle"></div>
      <div>
      <p>Phạm Quang Vinh</p>
      <p>Thông báo abcder</p>
      </div>
      </div>
      <div>
        2hr
      </div>
    </div>
    </div>
    
    
  );
   //thong bao
   const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Đăng xuất thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    setIsModalVisible(false);
    showNotification(); 
    setTimeout(() => {
      window.location.href = '/SignIn';
    }, 3000); // Thời gian chờ 3 giây (3000 milliseconds
    
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Menu
  className="menu__dashboard"
  theme="light"
  mode="inline"
  defaultSelectedKeys={["1"]}
/>
        <Menu
          className="menu__dashboard"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to={ROUTE_PATHS.Home}>Trang chủ</Link>,
            },
            {
              key: "2.1",
              icon: <AppstoreOutlined />,
              label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
            
            },
            {
              key: "2.3",
              icon: <DatabaseOutlined />,
              label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,

            },
            {
              key: "3",
              icon: <ShoppingCartOutlined />,
              label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
            },
            {
              key: "6",
              icon: <UserOutlined />,
              label: <Link to={ROUTE_PATHS.Customer}>Khách hàng</Link>,
            },
            {
              key: "10",
              icon: <MessageOutlined />,
              label: <Link to={ROUTE_PATHS.Voucher}>Khuyến mãi</Link>,
            },
            {
              key: "11",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
              onClick: openModal,
            },
          ]}
        /> 
      </Sider>
      <Layout className="layout">
        <div className="layout__dashboard">
          <Header
            className="layout__header containerCustom"
            style={{
              padding: 0,
            }}
          >
            <div className="layout__header--row">
              <div className="layout__header--menu">
                {React.createElement(
                  collapsed ? NodeCollapseOutlined  : NodeExpandOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </div>
              <div className="layout__header--search">
                <Input
                  className="layout__header--search--input"
                  allowClear={true}
                  placeholder="Type to search"
                  prefix={<SearchOutlined />}
                />
              </div>
              <div className="layout__header--icon">
                <Badge count={5}>
                  <Popover placement="bottomRight" content={content} title="Notifications (3)" className="layout__header__popover" style={{width:400}}>
                    <Button type="primary">
                      <MailOutlined />
                    </Button>
                  </Popover>
                </Badge>
                <Button className="layout__header__buttonCustom">
                  <BellOutlined />
                </Button>
                <Avatar size="default" icon={<UserOutlined />}>
        
                  </Avatar> 
              
              </div>
            </div>
          </Header>
          <main className="main__layout">{children}</main>
        </div>
        <Modal
        centered
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={handleCancel}
        className="modal__product"
        okType={"danger"}
      >
          <p className="modal__product__content--desc--logout">
            Bạn có chắc chắn muốn đăng xuất?
          </p>
      </Modal>
      </Layout>
    </Layout>
    
  );
};
export default Dashboard;
