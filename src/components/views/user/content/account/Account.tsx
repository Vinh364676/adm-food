import { Avatar, Button, Card, Checkbox, Form, Input, Select } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "./Account.scss";
import { useEffect } from "react";
import { dispatch, useSelector } from "../../../../../redux/store";
import { getNewsEvent } from "../../../../../redux/slices/news";
type Prop={

}
const Account = (props:Prop) => {
  const {news} = useSelector(state => state.news);
    
  useEffect(() => {
    dispatch(
      getNewsEvent({
        pageIndex: 1,
        pageSize: 100,
        eventType: 32,
      })
    );
  }, []);
    return(
      <div className="account">
            <Form
      name="basic"

      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      colon={false}
      requiredMark ={"optional"}
      className="account__form"
      style={{ maxWidth: 600 }}
    >
       <Form.Item
      label="Quyền"
      name="role"
      initialValue="1"
      rules={[
        {
          required: true,
          message: 'Vui lòng chọn quyền!',
        },
      ]}
    >
      <Select
    showSearch
    defaultValue="1"
    style={{
    }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Khách hàng',
      },
      {
        value: '2',
        label: 'Quản lý',
      },
      {
        value: '3',
        label: 'Nhân viên',
      },
      {
        value: '',
        label: 'Admin',
        disabled: true
      },
    ]}
  />
    </Form.Item>

      <Form.Item
      label="Tài khoản"
      name="username"
      rules={[
        {
          required: true,
          message: 'Vui lòng nhập trường tài khoản',
        },
      ]}
    >
      <Input className="form__input" />
    </Form.Item>
    
    <Form.Item
      label="Mật khẩu"
      name="password"
      rules={[
        {
          required: true,
          message: 'Vui lòng nhập trường mật khẩu!',
        },
      ]}
    >
      <Input className="form__input" />
    </Form.Item>
    <Form.Item
      label="Nhập lại mật khẩu"
      name="forgotpassword"
      rules={[
        {
          required: true,
          message: 'Vui lòng nhập trường nhập lại mật khẩu!',
        },
      ]}
    >
      <Input className="form__input" />
    </Form.Item>
    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Button type="primary" htmlType="submit">
        Submit
      </Button>
      </Form>
      <Card>
      {news.map(news => (
           
              
            <div className="cardItem">
              <img src={news.thumbnail} alt="Our Service" />
              <div className="cardItem__content">{news.name}</div>
            </div>
             
             ))}
      </Card>
      </div>
    );
}
export default Account;