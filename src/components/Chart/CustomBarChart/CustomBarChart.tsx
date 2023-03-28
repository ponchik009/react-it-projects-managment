import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataForBarChart } from "../../../types/interfaces";
import { Chart } from "../Chart";

// @ts-ignore
import styles from "./CustomBarChartProps.module.css";

interface CustomBarChartProps {
  data: DataForBarChart[];
  colors: string[];
  labels: string[];
  title: string;
}

export const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  colors,
  labels,
  title,
}) => {
  let maxValue = [...data].sort((a, b) => -a.Всего + b.Всего)[0].Всего;
  maxValue += maxValue > 3 ? maxValue % 3 : 3 % maxValue;
  const ticks = Array(3)
    .fill(0)
    .map((tick, index) => Math.round((maxValue / 3) * (index + 1)));

  const chart = (
    <BarChart width={700} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" fontSize={12} />
      <YAxis ticks={ticks} />
      <Tooltip />
      <Bar dataKey="Всего" fill={colors[0]}>
        {labels.map((label, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Bar>
    </BarChart>
  );

  return <Chart title={title} chart={chart} />;
};
