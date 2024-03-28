import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import TitleComponent from "../../components/titleComponent/Title";
import { ROUTE_PATHS } from "../../constants/url-config";
import ProductTable from "../../components/views/product/Product";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function ProductPage(props: Props) {
  return (
    <div className="homepage" >
    <TitleComponent title="Danh sách sản phẩm" to={ROUTE_PATHS.CreateProduct}/>
    <ProductTable/>
    </div>
  )
}
