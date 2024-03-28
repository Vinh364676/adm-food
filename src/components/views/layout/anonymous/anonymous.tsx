import React from "react";
import "./anonymous.scss";
import Dashboard from "../../../layout/Dashboard";
import { Space } from "antd";
import HeaderLayout from "../main/header/Header";

const AnonymousLayout = ({ children }: any) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return <div>
    
  </div>;
};

export default AnonymousLayout;
