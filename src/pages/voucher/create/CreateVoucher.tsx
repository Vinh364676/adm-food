import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import SupplierForm from "../../../components/views/supplier/supplier-form/SupplierForm";
import VoucherForm from "../../../components/views/voucher/voucher-form/VoucherForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateVoucher(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới khuyến mãi" isPrimary={false}/>
        <VoucherForm/>
    </h1>
  )
}

