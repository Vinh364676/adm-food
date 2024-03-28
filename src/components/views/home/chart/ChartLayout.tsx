import { Space } from "antd";
import ChartLine from "./Chart-line/ChartLine";
import ChartCol from "./chart-col/ChartCol";
import './ChartLayout.scss';
const ChartLayout = () => {
  return (
    <div className="chartLayout">
      <ChartLine />
      <ChartCol />
    </div>
  );
};

export default ChartLayout;
