import { Avatar, Form, Input } from "antd";
import "./Profile.scss";
import { UserOutlined } from '@ant-design/icons';

type Prop={

}
const Profile = (props:Prop) => {
    return(
      <div className="profile">
            <Form
      name="basic"
      className="account__form"
      style={{ maxWidth: 600 }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      colon={false}
      requiredMark ={"optional"}
    >
      <Form.Item
      label="Họ và tên"
      name="username"
      rules={[
        {
          required: true,
          message: 'Vui lòng nhập họ và tên!',
        },
      ]}
    >
      <Input className="form__input"/>
    </Form.Item>
    <Form.Item
      label="Email"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input className="form__input" />
    </Form.Item>
    <Form.Item
      label="Số điện thoại"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input className="form__input"/>
    </Form.Item>
      </Form>
      </div>
    );
}
export default Profile;