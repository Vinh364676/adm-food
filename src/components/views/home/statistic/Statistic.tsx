import { Card } from "antd";
import "./Statistic.scss";
import order from "../../../../assets/images/home/totalOrder.svg";
import delivery from  "../../../../assets/images/home/totalDelivery.svg";
import totalreturn from  "../../../../assets/images/home/return.svg";
import revenue from  "../../../../assets/images/home/totalRevenue.svg";
import { dispatch, useSelector } from "../../../../redux/store";
import { useEffect } from "react";

type Props = {};
const TotalStatistic = (props: Props) => {
    
  return (
    <div className="totalStatistic">
        
        <Card style={{ width: 264 }} className="total__card">
            <div className="total__card__item">
        <img className="total__card__item--img" style={{background:"rgba(255, 251, 235, 1)"}} src={order} alt="" />
        <div>
            <h2 className="total__card__item__title">Total Orders</h2>
            <div className="total__card__item__desc">
            <h5 className="total__card__item__desc--quantity">1,000</h5>
            <p className="total__card__item__desc--percent">+12%</p>
            </div>
        </div>
            </div>
      </Card>
      <Card style={{ width: 264 }} className="total__card">
            <div className="total__card__item">
        <img className="total__card__item--img" style={{background:"rgba(239, 246, 255, 1)"}} src={delivery} alt="" />
        <div>
            <h2 className="total__card__item__title">Total Delivered</h2>
            <div className="total__card__item__desc">
            <h5 className="total__card__item__desc--quantity">1,234</h5>
            <p className="total__card__item__desc--percent">+35%</p>
            </div>
        </div>
            </div>
      </Card>
      <Card style={{ width: 264 }} className="total__card">
            <div className="total__card__item">
        <img className="total__card__item--img" style={{background:"rgba(253, 242, 248, 1)"}} src={totalreturn} alt="" />
        <div>
            <h2 className="total__card__item__title">Total Canceled</h2>
            <div className="total__card__item__desc">
            <h5 className="total__card__item__desc--quantity">200</h5>
            <p className="total__card__item__desc--percent">-5%</p>
            </div>
        </div>
            </div>
      </Card>
      <Card style={{ width: 264 }} className="total__card">
            <div className="total__card__item">
        <img className="total__card__item--img" style={{background:"rgba(248, 250, 252, 1)"}} src={revenue} alt="" />
        <div>
            <h2 className="total__card__item__title">Total Revenue</h2>
            <div className="total__card__item__desc">
            <h5 className="total__card__item__desc--quantity">1,000</h5>
            <p className="total__card__item__desc--percent">+12%</p>
            </div>
        </div>
            </div>
      </Card>
        
      
    </div>
  );
};
export default TotalStatistic;
