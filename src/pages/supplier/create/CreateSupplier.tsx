import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import SupplierForm from "../../../components/views/supplier/supplier-form/SupplierForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateSupplier(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới nhà cung cấp" isPrimary={false}/>
        <SupplierForm/>
    </h1>
  )
}

