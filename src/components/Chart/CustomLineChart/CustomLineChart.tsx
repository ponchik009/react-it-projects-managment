import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataForPieChart } from "../../../types/interfaces";
import { Chart } from "../Chart";

// @ts-ignore
import styles from "./CustomLineChart.module.css";

interface CustomLineChartProps {
  data: any[];
  colors: string[];
  labels: string[];
  title: string;
}

export const CustomLineChart: React.FC<CustomLineChartProps> = ({
  data,
  colors,
  labels,
  title,
}) => {
  const chart = (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {labels.map((label, index) => (
        <Line type="monotone" dataKey={label} stroke={colors[index]} />
      ))}
    </LineChart>
  );

  return <Chart title={title} chart={chart} />;
};
