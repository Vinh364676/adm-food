import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteChildrenProps } from "react-router";
import { Link } from "react-router-dom";
import "./sign-in.scss";
import { useAuthContext } from "../../hooks/useAuthContext";
import banner from "../../assets/images/food.jpg";
import { UserOutlined,LinkOutlined } from '@ant-design/icons';
import LocalUtils from "../../utils/local";
import { LOCAL_STORAGE_KEYS } from "../../constants/local";
import { ROUTE_PATHS } from "../../constants/url-config";
import Loading from "../../components/atoms/loading/loading";
import LoadingComponent from "../../components/loading/loadingComponent";
interface Props extends RouteChildrenProps {}

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
    
      const loginData = {
        email: values.email,
        password: values.password,
      };
  
      console.log("Before API call");
      const response = await fetch('https://viviepi-food-app-api.onrender.com/auth/sign-in/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      console.log("After API call");
      console.log(response); // Log the API response for debugging
  
      const responseData = await response.json(); // Assuming the response is JSON
  
      if (response.status === 200) {
        const accessToken = responseData.data.accessToken;
        LocalUtils.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        login(loginData.email, loginData.password);
        notification.success({
          className: "notification__item",
          message: 'Đăng nhập thành công',
          description: `Xin chào, ${loginData.email}!`,
          duration: 3,
        });
        setTimeout(function() {
          window.location.href = '/'; // Replace with the actual path to your home page
        }, 3000);
      } else if (response.status === 401) {
        // Unauthorized - Incorrect email or password
        notification.error({
          message: 'Lỗi Đăng Nhập',
          description: 'Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại sau.',
        });
      } else {
        // Handle other error cases
        notification.error({
          message: 'Lỗi Đăng Nhập',
          description: 'Đã xảy ra lỗi không xác định trong quá trình đăng nhập. Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      // Handle exceptions
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="signIn">
    {loading && <LoadingComponent />}

      <Row>
        <Col span={12} className="signIn__banner">
			<img src={banner} alt="" />
		</Col>
        <Col span={12} className="signIn__content">
          <h2 className="signIn__content--title">Welcome</h2>
          <p className="signIn__content--desc">Đăng nhập với Email</p>
          <Form
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
			requiredMark ={"optional"}
             onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
			className="signIn__form"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input allowClear bordered={false} placeholder="Nhập email của bạn" prefix={<UserOutlined />} className="signIn__form__input"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password allowClear bordered={false} placeholder="Nhập mật khẩu của bạn" prefix={<LinkOutlined />} className="signIn__form__input"/>
            </Form.Item>
			  <div className="signIn__form__option">
				
				<Checkbox>Ghi nhớ mật khẩu</Checkbox>
					<Link to={ROUTE_PATHS.ForgotPassword}>
          <p className="signIn__form__option--forgot">Quên mật khẩu?</p>
          </Link>
			  </div>
			  <Button className="signIn__button" type="primary" htmlType="submit">
                Đăng nhập
              </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
