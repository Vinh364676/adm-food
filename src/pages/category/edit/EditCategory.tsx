import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import BrandForm from "../../../components/views/brand/brand-form/BrandForm";
import { dispatch, useSelector } from "../../../redux/store";
import { useEffect } from "react";
import { getCategory } from "../../../redux/slices/category";
import CategoryForm from "../../../components/views/category/category-form/CategoryForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditCategory(props: Props) {
  const { id } = useParams<{ id: string }>();// Extract the 'id' parameter from the URL
console.log(id);
const {categoryList} =useSelector(state=>state.category);
useEffect(() => {
  dispatch(
    getCategory({
      pageIndex: 1,
      pageSize: 100,
    })
  );
}, []);
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

