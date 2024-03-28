import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateOrder(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới đơn hàng" isPrimary={false}/>

    </h1>
  )
}

