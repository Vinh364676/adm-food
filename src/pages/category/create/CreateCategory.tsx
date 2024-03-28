import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import CategoryForm from "../../../components/views/category/category-form/CategoryForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateCategory(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới danh mục" isPrimary={false}/>
        <CategoryForm/>
    </h1>
  )
}

