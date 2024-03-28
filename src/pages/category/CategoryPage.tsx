import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";

import TitleComponent from "../../components/titleComponent/Title";

import { ROUTE_PATHS } from "../../constants/url-config";

import CategoryTable from "../../components/views/category/CategoryTable";
interface Props extends RouteChildrenProps, LayoutProps { }

export default function CategoryPage(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Danh sách danh mục" to={ROUTE_PATHS.CreateCategory}/>
        <CategoryTable/>
    </h1>
  )
}

