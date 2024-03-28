import { Button, Col, Form, Input, Row, Steps, message } from "antd";
import { RouteChildrenProps } from "react-router";
import "./ForgotPassword.scss";
import { UserOutlined,ArrowLeftOutlined,LinkOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/url-config";
import { useState } from "react";
interface Props extends RouteChildrenProps {}
export default function ForgotPassword() {
  const [formValid, setFormValid] = useState(false);

  const handleFormSubmit = (values:any) => {
    // Kiểm tra dữ liệu form ở đây, ví dụ:
    if (values.username) {
      // Dữ liệu form hợp lệ
      next();
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };
  const handleButton = () =>{
    next();
  }
  
  const steps = [
    {
      title: <>
      <h2>Your details</h2>
      <p>Vui lòng nhập email</p></>,
      content: <>
       <Form
       onFinish={handleFormSubmit}
        className="form__forgot"
        colon={false}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <div className="form__forgot__item">
          <h2 className="form__forgot__item__title">Quên mật khẩu</h2>
          <p className="form__forgot__item__desc">
            Đừng lo lắng, chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại.
          </p>
          <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: 'email',
                  message: 'Email chưa đúng định dạng, ví dụ abc@abc.com',
                },
              ]}
            >
              <Input allowClear bordered={false} placeholder="Nhập email" prefix={<UserOutlined />} className="form__forgot__input"/>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="form__forgot__button" onClick={handleFormSubmit}>
        Đặt lại mật khẩu
        </Button>
        <Link to={ROUTE_PATHS.SignIn}><span className="form__forgot__return"><ArrowLeftOutlined /> Quay lại trang đăng nhập</span></Link>
        </div>
      </Form></>,
    },
    {
      title: <>
      <h2>Your details</h2>
      <p>Kiểm tra email</p></>,
      content: <>
       <Form
       onFinish={handleFormSubmit}
        className="form__forgot"
        colon={false}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <div className="form__forgot__item">
          <h2 className="form__forgot__item__title">Kiểm tra email</h2>
          <p className="form__forgot__item__desc">
          Chúng tôi đã gửi liên kết đặt lại mật khẩu tới
          </p>
          <p className="form__forgot__item__desc__email">abc@abc.com</p>
            <Button type="primary" htmlType="submit" className="form__forgot__button" onClick={handleButton}>
        Mở email
        </Button>
        <p className="form__forgot__item__content">Bạn không nhận được email? <span className="form__forgot__item__content__button">Bấm để gửi lại</span></p>
        <Link to={ROUTE_PATHS.SignIn}><span className="form__forgot__return"><ArrowLeftOutlined /> Quay lại trang đăng nhập</span></Link>
        </div>
      </Form></>,
    },
    {
      title: <>
      <h2>Your details</h2>
      <p>Vui lòng nhập email</p></>,
      content: <>
       <Form
      //  onFinish={onFinish}
        className="form__forgot"
        colon={false}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <div className="form__forgot__item">
          <h2 className="form__forgot__item__title">Đặt mật khẩu mới</h2>
          <p className="form__forgot__item__desc">
          Mật khẩu mới của bạn phải khác với mật khẩu đã sử dụng trước đó.
          </p>
          <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password allowClear bordered={false} placeholder="Nhập mật khẩu" prefix={<LinkOutlined />} className="form__forgot__input"/>
            </Form.Item>
            <Form.Item
              name="passwordconfirm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu!",
                },
              ]}
            >
              <Input.Password allowClear bordered={false} placeholder="Nhập lại mật khẩu" prefix={<LinkOutlined />} className="form__forgot__input"/>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="form__forgot__button" onClick={handleButton}>
        Đặt lại mật khẩu
        </Button>
        <Link to={ROUTE_PATHS.SignIn}><span className="form__forgot__return"><ArrowLeftOutlined /> Quay lại trang đăng nhập</span></Link>
        </div>
      </Form></>,
    },
    {
      title: <>
      <h2>Your details</h2>
      <p>Vui lòng nhập email</p></>,
      content: <>
       <Form
      //  onFinish={onFinish}
        className="form__forgot"
        colon={false}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <div className="form__forgot__item">
          <h2 className="form__forgot__item__title">Đặt lại mật khẩu</h2>
          <p className="form__forgot__item__desc">
          Mật khẩu của bạn đã được đặt lại thành công. Nhấp vào bên dưới để đăng nhập.
          </p>
         
            <Button type="primary" htmlType="submit" className="form__forgot__button" onClick={() => message.success('Processing complete!')}>
        Đăng nhập
        </Button>
        </div>
      </Form></>,
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
  <>
  <Row>
    <Col span={12} className="forgot__col">
    <Steps direction="vertical" current={current} items={items} />
      <div className="steps-action">
      </div>
    </Col>
    <Col>
    <div className="steps-content">{steps[current].content}</div></Col>
  </Row>
    
    </>
  );
    
}
