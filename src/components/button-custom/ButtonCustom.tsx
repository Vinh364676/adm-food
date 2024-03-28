import { Button } from "antd";
import BreadcrumbHeader from "../breadcrumb/Breadcrumb";
import "./ButtonCustom.scss";
import {
    UserAddOutlined
  } from '@ant-design/icons';
import { Link } from "react-router-dom";
type Prop={
    icon:any
    title:string
    onClick?: (() => void) | ((file: any) => void);
}
const ButtonCustom = ({icon,title,onClick}:Prop) => {
    return(
        <Button onClick={onClick} className="buttonCustom">{icon}{title}</Button>
    );
}
export default ButtonCustom;