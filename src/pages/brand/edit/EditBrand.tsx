import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import BrandForm from "../../../components/views/brand/brand-form/BrandForm";
import { dispatch, useSelector } from "../../../redux/store";
import { useEffect } from "react";
import { getBrand } from "../../../redux/slices/brand";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditBrand(props: Props) {
  const { id } = useParams<{ id: string }>();// Extract the 'id' parameter from the URL
console.log(id);
const {brandList} =useSelector(state=>state.brand);
useEffect(() => {
  dispatch(
    getBrand({
      pageIndex: 1,
      pageSize: 100,
    })
  );
}, []);
const selectedBrand = { id };
  // Fetch the brand's data using 'id' (you might need to implement this function)
  // const selectedBrand = fetchBrandDataById(id); // Replace with your logic

  return (
    <h1 className="homepage" >
        <TitleComponent title="Chỉnh sửa thương hiệu" isPrimary={false}/>
        <BrandForm isEdit={true} selected={selectedBrand}/>
    </h1>
  )
}

