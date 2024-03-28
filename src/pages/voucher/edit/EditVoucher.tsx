import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import VoucherForm from "../../../components/views/voucher/voucher-form/VoucherForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditVoucher(props: Props) {
  const { id } = useParams<{ id: string }>();

const selectedBrand = { id };
  return (
    <h1 className="homepage" >
        <TitleComponent title="Chỉnh sửa khuyến mãi" isPrimary={false}/>
        <VoucherForm isEdit={true} selected={selectedBrand}/>
    </h1>
  )
}
