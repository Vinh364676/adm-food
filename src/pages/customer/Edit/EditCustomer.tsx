import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import CustomerForm from "../../../components/views/customer/customer-form/CustomerForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditCustomer(props: Props) {
  const { id } = useParams<{ id: string }>();// Extract the 'id' parameter from the URL
console.log(id);
const selectedCategory = { id };
 
  return (
    <h1 className="homepage" >
        <TitleComponent title="Chỉnh sửa thông tin khách hàng" isPrimary={false}/>
        <CustomerForm isEdit={true} selected={selectedCategory}/>
    </h1>
  )
}

