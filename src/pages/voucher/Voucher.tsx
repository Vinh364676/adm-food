import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import BreadcrumbHeader from "../../components/breadcrumb/Breadcrumb";
import TitleComponent from "../../components/titleComponent/Title";
import OrderTable from "../../components/views/order/OrderTable";
import { ROUTE_PATHS } from "../../constants/url-config";
import UserTable from "../../components/views/user/userTable/UserTable";
import VoucherTable from "../../components/views/voucher/VoucherTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function VoucherPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách tài khoản" to={ROUTE_PATHS.CreateVoucher}/>
        <VoucherTable/>
    </h1>
  )
}

