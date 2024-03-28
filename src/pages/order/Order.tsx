import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import BreadcrumbHeader from "../../components/breadcrumb/Breadcrumb";
import TitleComponent from "../../components/titleComponent/Title";
import OrderTable from "../../components/views/order/OrderTable";
import { ROUTE_PATHS } from "../../constants/url-config";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function OrderPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách đơn hàng" isPrimary={false}/>
        <OrderTable/>
    </h1>
  )
}

