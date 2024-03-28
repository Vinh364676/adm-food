import { Col, Row } from "antd";
import "./BackgroundUser.scss";
type Prop={

}
const BackgroundUser = (props:Prop) => {
    return(
     <div className="backgroundUser">
        <Row gutter={[0,30]}>
            <Col span={12}>Tài khoản:</Col>
            <Col span={12}>Vinh27122002</Col>
            <Col span={12}>Mật khẩu:</Col>
            <Col span={12}>Vinh12345</Col>
            <Col span={12}>Họ và tên:</Col>
            <Col span={12}>Phạm Quang Vinh</Col>
            <Col span={12}>Email:</Col>
            <Col span={12}>pqv4676@gmail.com</Col>
            <Col span={12}>Số điện thoại:</Col>
            <Col span={12}>0812364676</Col>
        </Row>
     </div>
    );
}
export default BackgroundUser;