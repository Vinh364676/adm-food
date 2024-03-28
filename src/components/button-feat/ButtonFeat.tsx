import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/url-config";
import { useState } from "react";
import checkoutIcon from "../../assets/images/product/checkout.png";
type Prop={
  link: string;
  onCreateNew: () => void;
  handleName:string;
}
const ButtonFeat = ({link,onCreateNew,handleName }:Prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
        window.location.href = link;
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return(
      <div>
        <Button onClick={showModal} type="primary" htmlType="button" className="brand__form__buttonGroup__button brand__form__buttonGroup__button--cancel">
          {/* <Link to={ROUTE_PATHS.Product}>Quay lại</Link> */}
          Quay lại
        </Button>
      <Button type="primary" htmlType="submit" className="brand__form__buttonGroup__button " onClick={onCreateNew}>
          {handleName}
        </Button>
        <Modal centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  className="modal__product" okType={"danger"}>
            <img src={checkoutIcon} alt="" className="modal__product__checkout"/>
         <div className="modal__product__content modal__product__content__exit">
        <h2 className="modal__product__content--title ">Thoát</h2>
        <p className="modal__product__content--desc">Bạn có chắc chắn muốn thoát khỏi trang này không?</p>
        </div>
      </Modal>
      </div>
    );
}
export default ButtonFeat;