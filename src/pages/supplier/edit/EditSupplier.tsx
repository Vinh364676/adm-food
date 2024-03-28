import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import BrandForm from "../../../components/views/brand/brand-form/BrandForm";
import { dispatch, useSelector } from "../../../redux/store";
import { useEffect } from "react";

import SupplierForm from "../../../components/views/supplier/supplier-form/SupplierForm";
import { getSupplier } from "../../../redux/slices/supplier";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditSupplier(props: Props) {
  const { id } = useParams<{ id: string }>();
console.log(id);
// const {supplierList} =useSelector(state=>state.supplier);
// useEffect(() => {
//   dispatch(
//     getSupplier({
//       pageIndex: 1,
//       pageSize: 100,
//     })
//   );
// }, []);
const selectedBrand = { id };
  // Fetch the brand's data using 'id' (you might need to implement this function)
  // const selectedBrand = fetchBrandDataById(id); // Replace with your logic

  return (
    <h1 className="homepage" >
        <TitleComponent title="Chỉnh sửa nhà cung cấp" isPrimary={false}/>
        <SupplierForm isEdit={true} selected={selectedBrand}/>
    </h1>
  )
}
