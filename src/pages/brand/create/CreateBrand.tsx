import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import BrandForm from "../../../components/views/brand/brand-form/BrandForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateBrand(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới thương hiệu" isPrimary={false}/>
        <BrandForm/>
    </h1>
  )
}

