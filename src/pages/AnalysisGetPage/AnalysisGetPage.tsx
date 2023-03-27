import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ClientsApi } from "../../api/clientsApi";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { CLIENT_TYPE_COLORS } from "../../const/const";
import { ClientType } from "../../types/enums";
import { Client } from "../../types/interfaces";

// @ts-ignore
import styles from "./AnalysisGetPage.module.css";

interface DataForPieChart {
  name: string;
  value: number;
}

export const AnalysisGetPage = () => {
  const [params, setParams] = useSearchParams();

  const dateStart = new Date(params.get("dateStart") as string);
  const dateEnd = new Date(params.get("dateEnd") as string);

  const [clients, setClients] = useState<Client[]>([]);

  const [dataForPieChart, setDataForPieChart] = useState<DataForPieChart[]>([]);

  useEffect(() => {
    console.log(clients);
    console.log(
      clients.reduce(
        (acc, cur) => (acc + cur.type === ClientType.phys ? 1 : 0),
        0
      )
    );
    setDataForPieChart([
      {
        name: ClientType.law + " лицо",
        value: clients.reduce(
          (acc, cur) => acc + (cur.type === ClientType.law ? 1 : 0),
          0
        ),
      },
      {
        name: ClientType.phys + " лицо",
        value: clients.reduce(
          (acc, cur) => acc + (cur.type === ClientType.phys ? 1 : 0),
          0
        ),
      },
    ]);
  }, [clients]);

  useEffect(() => {
    ClientsApi.getAllClients().then(setClients);
  }, []);

  return (
    <div className={styles.content}>
      <PageTitle
        title={`Анализ проектов на период от ${
          dateStart.toISOString().split("T")[0]
        } до ${dateEnd.toISOString().split("T")[0]}`}
      />
      <div className={styles.chart}>
        <span className={styles.chartTitle}>Доля типов клиентов</span>
        <div className={styles.chartData}>
          <PieChart width={200} height={200}>
            <Pie
              data={dataForPieChart}
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
              {dataForPieChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CLIENT_TYPE_COLORS[index]} />
              ))}
            </Pie>
          </PieChart>

          <div className={styles.chartLabels}>
            {Object.values(ClientType).map((client, index) => (
              <div className={styles.chartLabel} key={index}>
                <div
                  className={styles.chartLabelColor}
                  style={{ background: CLIENT_TYPE_COLORS[index] }}
                ></div>
                <span className={styles.chartLabelText}>{client} лицо</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
