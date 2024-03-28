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
    SearchOutlined
  } from "@ant-design/icons";
  import { Avatar, Badge, Button, Col, Input, Layout, Menu, Row } from "antd";
  import React, { useState } from "react";
  import logo from "../../assets/icon/logo.png";
  import "./Header.scss";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../../constants/url-config";
  const { Header, Sider, Content } = Layout;
  const HeaderLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
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
                  collapsed ? RightCircleOutlined : LeftCircleOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </div>
              <div className="layout__header--search">
              <Input className="layout__header--search--input" allowClear={true} placeholder="Type to search" prefix={<SearchOutlined />} />
              </div>
              <div className="layout__header--icon">
                <Badge count={5}>
                  <Button className="layout__header__buttonCustom">
                    <MailOutlined />
                  </Button>
                </Badge>
                <Button className="layout__header__buttonCustom">
                  <BellOutlined />
                </Button>
                <Avatar size="default" className="layout__header__user" icon={<UserOutlined />} />
              </div>
            </div>
          </Header>
          {/* <Content
            className="containerCustom layout__content"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content> */}
          </div>
         
        </Layout>
    );
  };
  export default HeaderLayout;
  