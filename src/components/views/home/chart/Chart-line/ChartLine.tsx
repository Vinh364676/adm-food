import "./ChartLine.scss";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Sun",
    uv: 97,
    pv: 60,
    amt: 100,
  },
  {
    name: "Mon",
    uv: 75,
    pv: 34.95,
    amt: 100,
  },
  {
    name: "Tus",
    uv: 50,
    pv: 88,
    amt: 100,
  },
  {
    name: "Wen",
    uv: 69.5,
    pv: 78.16,
    amt: 100,
  },
  {
    name: "Thu",
    uv: 47.25,
    pv: 60,
    amt: 100,
  },
  {
    name: "Fri",
    uv: 59.5,
    pv: 47.6,
    amt: 100,
  },
  {
    name: "Sat",
    uv: 87.25,
    pv: 77,
    amt: 100,
  },
];
// Define the custom Y-axis ticks
const customYAxisTicks = [0, 20, 40, 60, 80, 100];

export default function ChartLine() {
  return (
    <div className="chart__line">
      <p className="chart__line__title">Performance</p>
      <div>
        <LineChart width={700} height={300} data={data}>
          <CartesianGrid vertical={false} strokeDasharray="" />
          <XAxis dataKey="name" axisLine={false} />
          <YAxis
          className="axisY"
            axisLine={false}
            domain={[0, 100]} // Set Y-axis domain to 0-100%
            ticks={customYAxisTicks} // Set custom Y-axis ticks
            tickFormatter={(value) => `${value}%`} // Format Y-axis ticks as percentages
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#2563EB"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" strokeWidth={2} stroke="#ED4F9D" />
        </LineChart>
      </div>
      <div></div>
    </div>
  );
}
