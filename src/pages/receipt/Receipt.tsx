import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import BreadcrumbHeader from "../../components/breadcrumb/Breadcrumb";
import TitleComponent from "../../components/titleComponent/Title";

import { ROUTE_PATHS } from "../../constants/url-config";
import ReceiptTable from "../../components/views/receipt/ReceiptTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function ReceiptPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách hóa đơn nhập hàng" to={ROUTE_PATHS.CreateReceipt}/>
        <ReceiptTable/>
    </h1>
  )
}

