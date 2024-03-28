import { RouteChildrenProps, useParams } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import ProductForm from "../../../components/views/product/product-create/ProductForm";
import { useSelector } from "react-redux";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function EditProduct(props: Props) {
  const { id } = useParams<{ id: string }>();// Extract the 'id' parameter from the URL
  console.log(id);
  // const {produc} =useSelector(state=>state.);
  // useEffect(() => {
  //   dispatch(
  //     getBrand({
  //       pageIndex: 1,
  //       pageSize: 100,
  //     })
  //   );
  // }, []);
  const selectedBrand = { id };
  return (
    <h1 className="homepage" >
        <TitleComponent title="Chỉnh sửa sản phẩm" isPrimary={false}/>
        <ProductForm isEdit={true} selected={selectedBrand}/>
    </h1>
  )
}
