import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  HomeOutlined,
  MailOutlined,
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  ShoppingOutlined,
  MessageOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  RocketOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  CalendarOutlined,
  MedicineBoxOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Modal,
  Popover,
  Row,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import logo from "../../assets/icon/logo.png";
import "./Dashboard.scss";
import { ROUTE_PATHS } from "../../constants/url-config";
import { Link, NavLink, useHistory } from "react-router-dom";
import LocalUtils from "../../utils/local";
import { LOCAL_STORAGE_KEYS } from "../../constants/local";
import useResponsive from "../../hooks/useResponsive";
import { dispatch, useSelector } from "../../redux/store";
import { getUser } from "../../redux/slices/user";
import jwt from 'jsonwebtoken';
const { Header, Sider, Content } = Layout;
const Dashboard = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {userList} = useSelector((state) => state.user) 
  const openModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    dispatch(
      getUser({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);

  const token = LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  let userRole = null;
  
  if (token !== null) {
    const decodedToken = jwt.decode(token);
    const userId = (decodedToken as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log('====================================');
    console.log("userId",userId);
    console.log('====================================');
    const user = userList.find(user => user.id === parseInt(userId, 10));

    console.log('====================================');
    console.log("user",user);
    console.log('====================================');
    if (user) {
      userRole = user.roleId; // Assuming user object has a roleId property
    }
  }
  console.log('====================================');
  console.log("userRole",userRole);
  console.log('====================================');
  let filteredMenuItems: any[] = [];
  console.log('====================================');
  console.log("filteredMenuItems",filteredMenuItems);
  console.log('====================================');
  switch (userRole) {
    case 1:
      // Display all menu items
      filteredMenuItems = [
        {
          key: "1",
          icon: <HomeOutlined />,
          label: <Link to={ROUTE_PATHS.Home}>Trang chủ</Link>,
        },
        {
          key: "2",
          icon: <AppstoreOutlined />,
          label: "Tính năng",
          children:[
            {
              key: "2.1",
              label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
              className: "menu__dashboard--label",
            },
            {
              key: "2.2",
              label: <Link to={ROUTE_PATHS.Brand}>Thương hiệu</Link>,
              className: "menu__dashboard--label",
            },
            {
              key: "2.3",
              label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,
              className: "menu__dashboard--label",
            },
          ]
        },
        {
          key: "3",
          icon: <ShoppingCartOutlined />,
          label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
        },
        {
          key: "4",
          icon: <CalendarOutlined />,
          label: <Link to={ROUTE_PATHS.Receipt}>Hóa đơn</Link>,
        },
        {
          key: "5",
          icon: <MedicineBoxOutlined />,
          label: <Link to={ROUTE_PATHS.Supplier}>Nhà cung cấp</Link>,
        },
        {
          key: "6",
          icon: <UserOutlined />,
          label: <Link to={ROUTE_PATHS.Customer}>Khách hàng</Link>,
        },
        {
          key: "7",
          icon: <UserOutlined />,
          label: <Link to={ROUTE_PATHS.Customer}>Nhân viên</Link>,
        },
        {
          key: "8",
          icon: <UserOutlined />,
          label: <Link to={ROUTE_PATHS.User}>Tài khoản</Link>,
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
      ];
      break;
    case 2:
      // Display menu items for role 2
      filteredMenuItems = [
        
      ];
      break;
    case 3:
      // Display menu items for role 3
      filteredMenuItems = [
        {
          key: "1",
          icon: <HomeOutlined />,
          label: <Link to={ROUTE_PATHS.Home}>Trang chủ</Link>,
        },
        {
          key: "2",
          icon: <AppstoreOutlined />,
          label: "Tính năng",
          children:[
            {
              key: "2.1",
              label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
              className: "menu__dashboard--label",
            },
            {
              key: "2.2",
              label: <Link to={ROUTE_PATHS.Brand}>Thương hiệu</Link>,
              className: "menu__dashboard--label",
            },
            {
              key: "2.3",
              label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,
              className: "menu__dashboard--label",
            },
          ]
        },
        {
          key: "3",
          icon: <ShoppingCartOutlined />,
          label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
        },
        {
          key: "4",
          icon: <CalendarOutlined />,
          label: <Link to={ROUTE_PATHS.Receipt}>Hóa đơn</Link>,
        },
        {
          key: "5",
          icon: <MedicineBoxOutlined />,
          label: <Link to={ROUTE_PATHS.Supplier}>Nhà cung cấp</Link>,
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
      ];
      break;
    case 4:
      // Display menu items for role 4
      filteredMenuItems = [
        {
          key: "1",
          icon: <HomeOutlined />,
          label: <Link to={ROUTE_PATHS.Home}>Trang chủ</Link>,
        },
        {
          key: "2",
          icon: <AppstoreOutlined />,
          label: "Tính năng",
          children:[
            {
              key: "2.1",
              label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
              className: "menu__dashboard--label",
            },
            {
              key: "2.2",
              label: <Link to={ROUTE_PATHS.Brand}>Thương hiệu</Link>,
              className: "menu__dashboard--label",
            },
            {
              key: "2.3",
              label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,
              className: "menu__dashboard--label",
            },
          ]
        },
        {
          key: "3",
          icon: <ShoppingCartOutlined />,
          label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
        },
        {
          key: "5",
          icon: <MedicineBoxOutlined />,
          label: <Link to={ROUTE_PATHS.Supplier}>Nhà cung cấp</Link>,
        },
        {
          key: "11",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: openModal,
        },
      ];
      break;
    default:
      // Handle other roles or display an error message
      console.error("Invalid user role");
  }

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
  const history = useHistory();
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
  const {isMobile} = useResponsive();

  // const menuItems = {
  //   1: [
  //     {
  //       key: "1",
  //       icon: <HomeOutlined />,
  //       label: <Link to={ROUTE_PATHS.Home}>Trang chủ</Link>,
  //     },
  //     {
  //       key: "2",
  //       icon: <AppstoreOutlined />,
  //       label: "Tính năng",
  //       children: [
  //         {
  //           key: "2.1",
  //           label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
  //           className: "menu__dashboard--label",
  //         },
  //         {
  //           key: "2.2",
  //           label: <Link to={ROUTE_PATHS.Brand}>Thương hiệu</Link>,
  //           className: "menu__dashboard--label",
  //         },
  //         {
  //           key: "2.3",
  //           label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,
  //           className: "menu__dashboard--label",
  //         },
  //       ]
  //     },
  //     {
  //       key: "3",
  //       icon: <ShoppingCartOutlined />,
  //       label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
  //     },
  //     {
  //       key: "4",
  //       icon: <CalendarOutlined />,
  //       label: <Link to={ROUTE_PATHS.Receipt}>Hóa đơn</Link>,
  //     },
  //     {
  //       key: "5",
  //       icon: <MedicineBoxOutlined />,
  //       label: <Link to={ROUTE_PATHS.Supplier}>Nhà cung cấp</Link>,
  //     },
  //     {
  //       key: "6",
  //       icon: <UserOutlined />,
  //       label: <Link to={ROUTE_PATHS.Customer}>Khách hàng</Link>,
  //     },
  //     {
  //       key: "7",
  //       icon: <UserOutlined />,
  //       label: <Link to={ROUTE_PATHS.Customer}>Nhân viên</Link>,
  //     },
  //     {
  //       key: "8",
  //       icon: <UserOutlined />,
  //       label: <Link to={ROUTE_PATHS.User}>Tài khoản</Link>,
  //     },
  //     {
  //       key: "10",
  //       icon: <MessageOutlined />,
  //       label: <Link to={ROUTE_PATHS.Voucher}>Khuyến mãi</Link>,
  //     },
  //     {
  //       key: "11",
  //       icon: <LogoutOutlined />,
  //       label: "Đăng xuất",
  //       onClick: openModal,
  //     },
  //   ],
  //   2: [], // No items for role 2
  //   3: [
  //     {
  //       key: "2",
  //       icon: <AppstoreOutlined />,
  //       label: "Tính năng",
  //       children: [
  //         {
  //           key: "2.1",
  //           label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
  //           className: "menu__dashboard--label",
  //         },
  //         {
  //           key: "2.2",
  //           label: <Link to={ROUTE_PATHS.Brand}>Thương hiệu</Link>,
  //           className: "menu__dashboard--label",
  //         },
  //         {
  //           key: "2.3",
  //           label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,
  //           className: "menu__dashboard--label",
  //         },
  //       ]
  //     },
  //     {
  //       key: "3",
  //       icon: <ShoppingCartOutlined />,
  //       label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
  //     },
  //     {
  //       key: "4",
  //       icon: <CalendarOutlined />,
  //       label: <Link to={ROUTE_PATHS.Receipt}>Hóa đơn</Link>,
  //     },
  //   ],
  //   4: [
  //     {
  //       key: "3",
  //       icon: <ShoppingCartOutlined />,
  //       label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
  //     },
  //     {
  //       key: "4",
  //       icon: <CalendarOutlined />,
  //       label: <Link to={ROUTE_PATHS.Receipt}>Hóa đơn</Link>,
  //     },
  //     {
  //       key: "10",
  //       icon: <MessageOutlined />,
  //       label: <Link to={ROUTE_PATHS.Voucher}>Khuyến mãi</Link>,
  //     },
  //   ],
  // };
  // const userMenuItems = (menuItems as Record<number, any>)[userRoles?.[0]] || [];

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
  items={filteredMenuItems}
/>
        {/* <Menu
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
              key: "2",
              icon: <AppstoreOutlined />,
              label: "Tính năng",
              children:[
                {
                  key: "2.1",
                  label: <Link to={ROUTE_PATHS.Product}>Sản phẩm</Link>,
                  className: "menu__dashboard--label",
                },
                {
                  key: "2.2",
                  label: <Link to={ROUTE_PATHS.Brand}>Thương hiệu</Link>,
                  className: "menu__dashboard--label",
                },
                {
                  key: "2.3",
                  label: <Link to={ROUTE_PATHS.Category}>Danh mục</Link>,
                  className: "menu__dashboard--label",
                },
              ]
            },
            {
              key: "3",
              icon: <ShoppingCartOutlined />,
              label: <Link to={ROUTE_PATHS.Order}>Đơn hàng</Link>,
            },
            {
              key: "4",
              icon: <CalendarOutlined />,
              label: <Link to={ROUTE_PATHS.Receipt}>Hóa đơn</Link>,
            },
            {
              key: "5",
              icon: <MedicineBoxOutlined />,
              label: <Link to={ROUTE_PATHS.Supplier}>Nhà cung cấp</Link>,
            },
            {
              key: "6",
              icon: <UserOutlined />,
              label: <Link to={ROUTE_PATHS.Customer}>Khách hàng</Link>,
            },
            {
              key: "7",
              icon: <UserOutlined />,
              label: <Link to={ROUTE_PATHS.Customer}>Nhân viên</Link>,
            },
            {
              key: "8",
              icon: <UserOutlined />,
              label: <Link to={ROUTE_PATHS.User}>Tài khoản</Link>,
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
        /> */}
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
