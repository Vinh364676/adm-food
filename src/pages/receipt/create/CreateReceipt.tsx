import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import ReceiptForm from "../../../components/views/receipt/receipt-form/ReceiptForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateReceipt(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới hóa đơn nhập hàng" isPrimary={false}/>
      <ReceiptForm/>
    </h1>
  )
}

