import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ClientsApi } from "../../api/clientsApi";
import { ProjectsApi } from "../../api/projectsApi";

import { CustomBarChart } from "../../components/Chart/CustomBarChart/CustomBarChart";
import { CustomLineChart } from "../../components/Chart/CustomLineChart/CustomLineChart";
import { CustomPieChart } from "../../components/Chart/CustomPieChart/CustomPieChart";
import { Input } from "../../components/Input/Input";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import {
  CLIENT_TYPE_COLORS,
  PROJECT_STATUSES_COLORS,
  PROJECT_TYPE_COLORS,
} from "../../const/const";
import { ClientType, ProjectStatuses, ProjectType } from "../../types/enums";
import { Client, DataForPieChart, Project } from "../../types/interfaces";

// @ts-ignore
import styles from "./AnalysisGetPage.module.css";

const countPoints = (projects: Project[], dateStart: Date, dateEnd: Date) => {
  let base = {} as { [key: string]: any };

  base[dateStart.toISOString().split("T")[0]] = {
    name: dateStart.toISOString().split("T")[0],
    [ProjectStatuses.work]: 0,
    [ProjectStatuses.ended]: 0,
    [ProjectStatuses.rejected]: 0,
  };

  base = Object.assign(
    base,
    projects.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.dateStart.toISOString().split("T")[0]]: {
          name: cur.dateStart.toISOString().split("T")[0],
          [ProjectStatuses.work]: 0,
          [ProjectStatuses.ended]: 0,
          [ProjectStatuses.rejected]: 0,
        },
        [cur.dateEnd?.toISOString().split("T")[0] || "off"]: {
          name: cur.dateEnd?.toISOString().split("T")[0] || "off",
          [ProjectStatuses.work]: 0,
          [ProjectStatuses.ended]: 0,
          [ProjectStatuses.rejected]: 0,
        },
      }),
      {}
    )
  );

  base[dateEnd.toISOString().split("T")[0]] = {
    name: dateEnd.toISOString().split("T")[0],
    [ProjectStatuses.work]: 0,
    [ProjectStatuses.ended]: 0,
    [ProjectStatuses.rejected]: 0,
  };

  for (let date of Object.keys(base)) {
    projects.forEach((p) => {
      if (p.dateStart.toISOString().split("T")[0] <= date) {
        base[date][ProjectStatuses.work] += 1;
      }
      if (p.dateEnd && p.dateEnd.toISOString().split("T")[0] <= date) {
        base[date][ProjectStatuses.ended] += 1;
        base[date][ProjectStatuses.work] -= 1;
      }
      if (
        p.dateStart.toISOString().split("T")[0] <= date &&
        p.status === ProjectStatuses.rejected
      ) {
        base[date][ProjectStatuses.rejected] += 1;
        base[date][ProjectStatuses.work] -= 1;
      }
    });
  }

  delete base["off"];

  return Object.values(base);
};

export const AnalysisGetPage = () => {
  const [params, setParams] = useSearchParams();

  const dateStart = new Date(params.get("dateStart") as string);
  const dateEnd = new Date(params.get("dateEnd") as string);

  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const dataForPieChart = useMemo<DataForPieChart[]>(
    () =>
      Object.values(ClientType).map((type) => ({
        name: type + " лицо",
        value: clients.reduce(
          (acc, cur) => acc + (cur.type === type ? 1 : 0),
          0
        ),
      })),

    [clients]
  );
  const labelsForPieChart = Object.values(ClientType).map(
    (clientType) => clientType + " лицо"
  );

  const dataForBarChart = useMemo(
    () =>
      Object.values(ProjectType).map((type) => ({
        name: type,
        Всего: projects.reduce(
          (acc, cur) => acc + (cur.type === type ? 1 : 0),
          0
        ),
      })),
    [projects]
  );
  const labelsForBarChart = Object.values(ProjectType);

  const dataForLineChart = useMemo(
    () => countPoints(projects, new Date(dateStart), new Date(dateEnd)),
    [projects]
  );
  const labelsForLineChart = Object.values(ProjectStatuses);
  const colorsForLineChart = Object.values(PROJECT_STATUSES_COLORS);

  useEffect(() => {
    ClientsApi.getAllClients().then(setClients);
    ProjectsApi.getAllProjects("", {
      clients: [],
      statuses: [],
      types: [],
      date: {
        from: new Date(dateStart),
        to: new Date(dateEnd),
      },
    }).then(setProjects);
  }, []);

  return (
    <div className={styles.content}>
      <PageTitle
        title={`Анализ проектов на период от ${
          dateStart.toISOString().split("T")[0]
        } до ${dateEnd.toISOString().split("T")[0]}`}
      />
      <div style={{ display: "flex", gap: "64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <Input
            id="projects"
            label="Кол-во проектов"
            onChange={() => {}}
            value={projects.length}
            disabled
            required={false}
            width="128px"
          />
          <Input
            id="clients"
            label="Кол-во клиентов"
            onChange={() => {}}
            value={clients.length}
            disabled
            required={false}
            width="128px"
          />
        </div>
        <CustomLineChart
          colors={colorsForLineChart}
          labels={labelsForLineChart}
          title="Изменение статусов проектов"
          data={dataForLineChart}
        />
      </div>
      <div style={{ display: "flex", gap: "64px", justifyContent: "cetner" }}>
        <CustomBarChart
          colors={PROJECT_TYPE_COLORS}
          title="Типы проектов"
          data={dataForBarChart}
          labels={labelsForBarChart}
        />
        <CustomPieChart
          colors={CLIENT_TYPE_COLORS}
          data={dataForPieChart}
          labels={labelsForPieChart}
          title="Доля типов клиентов"
        />
      </div>
    </div>
  );
};
