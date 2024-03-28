import React from "react";
import "./Breadcrumb.scss";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import useResponsive from "../../hooks/useResponsive";
import { useTranslation } from "react-i18next";

const BreadcrumbHeader = () => {
  const { isMobile } = useResponsive();
  const location = useLocation();
  const { t } = useTranslation();

  const updateBreadcrumb = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);

    return (
      <div
        data-aos="fade-right"
        data-aos-duration="200"
        className="breadcrumb"
      >
        <Breadcrumb separator={<span className="dot">•</span>}>
          <Breadcrumb.Item>
            <Link to="/">{t("Router.Home")}</Link>
          </Breadcrumb.Item>
          {pathnames.map((item, index) => {
     
            const name = t(`Router.${item}`)
            return (
            <Breadcrumb.Item key={index}>
              <Link to={`/${item}`}>{name}</Link>  
            </Breadcrumb.Item>
          )})}
        </Breadcrumb>
      </div>
    );
  };

  return <>{updateBreadcrumb()}</>;
};

export default BreadcrumbHeader;
