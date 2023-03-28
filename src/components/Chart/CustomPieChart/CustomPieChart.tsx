import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { DataForPieChart } from "../../../types/interfaces";
import { Chart } from "../Chart";

// @ts-ignore
import styles from "./CustomPieChart.module.css";

interface CustomPieChartProps {
  data: DataForPieChart[];
  colors: string[];
  labels: string[];
  title: string;
}

export const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  colors,
  labels,
  title,
}) => {
  const chart = (
    <PieChart width={200} height={200}>
      <Tooltip />
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        isAnimationActive={true}
        id="pie"
        labelLine={true}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
    </PieChart>
  );

  const chartLabels = labels.map((label, index) => (
    <div className={styles.chartLabel} key={index}>
      <div
        className={styles.chartLabelColor}
        style={{ background: colors[index] }}
      ></div>
      <span className={styles.chartLabelText}>{label}</span>
    </div>
  ));

  return <Chart title={title} chart={chart} labels={chartLabels} />;
};
