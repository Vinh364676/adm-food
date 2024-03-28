import { Button } from "antd";
import BreadcrumbHeader from "../breadcrumb/Breadcrumb";
import "./Title.scss";
import {
    UserAddOutlined,
    PlusOutlined
  } from '@ant-design/icons';
import { Link } from "react-router-dom";
import ButtonCustom from "../button-custom/ButtonCustom";
type Prop={
    title:string;
    isPrimary?:boolean;
    to?: string;
}
const TitleComponent = ({title, isPrimary=true, to}:Prop) => {
    return(
        <div className="titleComponent">
        <div>
        <h5 className="title">{title}</h5>
        <BreadcrumbHeader/>
        </div>
        {isPrimary && to ? ( // Check if both isPrimary and to are truthy
        <Link to={to}>
          <ButtonCustom icon={<PlusOutlined />} title="Tạo mới"/>
        </Link>
      ) : (
        isPrimary && <ButtonCustom icon={<PlusOutlined />} title="Tạo mới"/>
      )}
        </div>
    );
}
export default TitleComponent;