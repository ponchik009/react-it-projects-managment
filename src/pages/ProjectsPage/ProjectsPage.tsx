import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../api/clientsApi";
import { ProjectsApi } from "../../api/projectsApi";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { ProjectsList } from "../../components/ProjectsList/ProjectsList";
import { useInput } from "../../hooks/useInput";
import { ProjectStatuses, ProjectType } from "../../types/enums";
import { Client, Project } from "../../types/interfaces";

//@ts-ignore
import styles from "./ProjectsPage.module.css";

export const ProjectsPage = () => {
  const navigate = useNavigate();

  const onAddClick = () => navigate("/projects/create");

  // Проекты
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    ProjectsApi.getAllProjects().then(setProjects);
  }, []);

  // Фильтры
  const {
    hook: [search, onSearchChange],
  } = useInput<string>("");

  const [clientOptions, setClientOptions] = useState<Client[]>([]);
  const typeOptions = ["Все", ...Object.values(ProjectType)];

  useEffect(() => {
    ClientsApi.getAllClients().then(setClientOptions);
  }, []);

  const {
    hook: [currentType, onTypeChange],
  } = useInput<ProjectType | "Все">("Все");

  const {
    hook: [currentClient, onClientChange],
  } = useInput<number>(-1);

  const {
    hook: [withEnded, onWithEndedChange],
  } = useInput<boolean>(false);

  const {
    hook: [withWorking, onWithWorkingChange],
  } = useInput<boolean>(false);

  const {
    hook: [withRejected, onWithRejectedChange],
  } = useInput<boolean>(false);

  useEffect(() => {
    const statuses = [];

    if (withEnded) {
      statuses.push(ProjectStatuses.ended);
    }
    if (withRejected) {
      statuses.push(ProjectStatuses.rejected);
    }
    if (withWorking) {
      statuses.push(ProjectStatuses.work);
    }

    ProjectsApi.getAllProjects(search, {
      statuses,
      clients: "" + currentClient === "-1" ? [] : [+currentClient],
      types: currentType === "Все" ? [] : [currentType],
      date: null,
    }).then(setProjects);
  }, [
    search,
    currentClient,
    currentType,
    withEnded,
    withRejected,
    withWorking,
  ]);

  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <PageTitle title="Проекты" />
        <ProjectsList projects={projects} />
        <Button color="#219653" text="Добавить" onClick={onAddClick} />
      </div>
      <div className={styles.right}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Поиск..."
          value={search}
          onChange={onSearchChange}
        />
        <span>Фильтры</span>
        <Checkbox
          color="#219653"
          id="ended"
          checked={withEnded}
          label="Завершён"
          onChange={onWithEndedChange}
        />
        <Checkbox
          color="#FF5B2E"
          id="working"
          checked={withWorking}
          label="В процессе"
          onChange={onWithWorkingChange}
        />
        <Checkbox
          color="rgba(210, 32, 67, 1)"
          id="rejected"
          checked={withRejected}
          label="Отклонён"
          onChange={onWithRejectedChange}
        />
        <label htmlFor="type">
          Тип проекта
          <select
            name="type"
            id="type"
            value={currentType}
            onChange={onTypeChange}
          >
            {typeOptions.map((typeOption) => (
              <option value={typeOption} key={typeOption}>
                {typeOption}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="client">
          Клиент
          <select
            name="client"
            id="client"
            value={currentClient}
            onChange={onClientChange}
          >
            {[{ id: -1, name: "Все" }, ...clientOptions].map((clientOption) => (
              <option value={clientOption.id} key={clientOption.id}>
                {clientOption.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
