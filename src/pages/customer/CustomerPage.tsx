import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import BreadcrumbHeader from "../../components/breadcrumb/Breadcrumb";
import TitleComponent from "../../components/titleComponent/Title";
import OrderTable from "../../components/views/order/OrderTable";
import { ROUTE_PATHS } from "../../constants/url-config";
import BrandTable from "../../components/views/brand/BrandTable";
import CustomerTable from "../../components/views/customer/CustomerTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function CustomerPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách khách hàng" to={ROUTE_PATHS.CreateCustomer}/>
        <CustomerTable/>
    </h1>
  )
}

