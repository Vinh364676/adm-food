import { RouteChildrenProps } from "react-router";
import TitleComponent from "../../../components/titleComponent/Title";
import { LayoutProps } from "antd";
import UserForm from "../../../components/views/user/user-form/UserForm";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function CreateUser(props: Props) {
  return (
    <h1 className="homepage" >
        <TitleComponent title="Tạo mới tài khoản" isPrimary={false}/>
        <UserForm/>
    </h1>
  )
}
