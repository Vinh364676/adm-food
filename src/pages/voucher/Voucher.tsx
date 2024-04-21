import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import TitleComponent from "../../components/titleComponent/Title";
import { ROUTE_PATHS } from "../../constants/url-config";
import VoucherTable from "../../components/views/voucher/VoucherTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function VoucherPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách khuyến mãi" to={ROUTE_PATHS.CreateVoucher}/>
        <VoucherTable/>
    </h1>
  )
}

