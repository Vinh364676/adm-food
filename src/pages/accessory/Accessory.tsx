import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import TitleComponent from "../../components/titleComponent/Title";
import { ROUTE_PATHS } from "../../constants/url-config";
// import AccessoryTable from "../../components/views/accessory/AccessoryTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function Accessory(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách phụ kiện" to={ROUTE_PATHS.CreateBrand}/>
        {/* <AccessoryTable/> */}
    </h1>
  )
}

