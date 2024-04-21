import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import CustomerForm from "../../../components/views/customer/customer-form/CustomerForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateCustomer(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới khách hàng" isPrimary={false}/>
        <CustomerForm/>
    </h1>
  )
}

