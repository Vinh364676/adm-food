import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import CategoryForm from "../../../components/views/category/category-form/CategoryForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditCategory(props: Props) {
  const { id } = useParams<{ id: string }>();// Extract the 'id' parameter from the URL

const selectedCategory = { id };
  // Fetch the brand's data using 'id' (you might need to implement this function)
  // const selectedBrand = fetchBrandDataById(id); // Replace with your logic

  return (
    <h1 className="homepage" >
        <TitleComponent title="Chỉnh sửa danh mục" isPrimary={false}/>
        <CategoryForm isEdit={true} selected={selectedCategory}/>
    </h1>
  )
}

