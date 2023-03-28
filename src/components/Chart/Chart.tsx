import React, { ReactNode } from "react";

// @ts-ignore
import styles from "./Chart.module.css";

interface ChartProps {
  title: string;
  chart: ReactNode;
  labels?: ReactNode;
}

export const Chart: React.FC<ChartProps> = ({ chart, labels, title }) => {
  return (
    <div className={styles.chart}>
      <span className={styles.chartTitle}>{title}</span>
      <div className={styles.chartData}>
        {chart}
        {labels && <div className={styles.chartLabels}>{labels}</div>}
      </div>
    </div>
  );
};
