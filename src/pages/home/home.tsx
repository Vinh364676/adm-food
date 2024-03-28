import { RouteChildrenProps } from "react-router";
import { LayoutProps } from "../../components/views/layout/route-layout";
import "./home.scss"
import Dashboard from "../../components/layout/Dashboard";
import TotalStatistic from "../../components/views/home/statistic/Statistic";
import BestSale from "../../components/views/home/bestSale/BestSale";
import ChartLayout from "../../components/views/home/chart/ChartLayout";

interface Props extends RouteChildrenProps, LayoutProps { }

export default function HomePage(props: Props) {
  return (
    <div className="homepage" >
      <TotalStatistic/>
      <ChartLayout/>
      <BestSale/>
    </div>
  )
}

