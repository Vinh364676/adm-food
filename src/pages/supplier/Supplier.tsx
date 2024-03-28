import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import BreadcrumbHeader from "../../components/breadcrumb/Breadcrumb";
import TitleComponent from "../../components/titleComponent/Title";
import OrderTable from "../../components/views/order/OrderTable";
import { ROUTE_PATHS } from "../../constants/url-config";
import SupplierTable from "../../components/views/supplier/SupplierTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function SupplierPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách nhà cung cấp" to={ROUTE_PATHS.CreateSupplier}/>
        <SupplierTable/>
    </h1>
  )
}

