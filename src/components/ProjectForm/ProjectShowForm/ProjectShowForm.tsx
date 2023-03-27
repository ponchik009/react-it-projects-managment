import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../../api/clientsApi";
import { ProjectsApi } from "../../../api/projectsApi";
import { PROJECT_STATUSES_COLORS } from "../../../const/const";

import { useInput } from "../../../hooks/useInput";
import {
  ProjectStages,
  ProjectStatuses,
  ProjectType,
} from "../../../types/enums";
import { Client, Project } from "../../../types/interfaces";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Select } from "../../Select/Select";

// @ts-ignore
import styles from "../ProjectForm.module.css";

interface ProjectShowFormProps {
  onEditClick: () => void;
  project: Project;
}

export const ProjectShowForm: React.FC<ProjectShowFormProps> = ({
  onEditClick,
  project,
}) => {
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    ClientsApi.getClient(project.clientId).then((result) =>
      setClient(result as Client)
    );
  }, []);

  const navigate = useNavigate();

  const onCancelClick = () => {
    navigate("/projects");
  };

  return (
    <div className={styles.form}>
      <div className={styles.inputs}>
        <Input
          id="name"
          label="Наименование"
          onChange={() => {}}
          value={project.name}
          placeholder="Наименование проекта"
          type="text"
          disabled
          required={false}
        />
        <Select
          id="client"
          required={false}
          value={project.clientId}
          label="Заказчик"
          onChange={() => {}}
          options={[
            {
              name: client?.name || "",
              value: client?.id || 0,
            },
          ]}
          disabled
        />
        <Select
          id="type"
          required={false}
          value={project.type}
          label="Тип Проекта"
          onChange={() => {}}
          options={[
            {
              name: project.type,
              value: project.type,
            },
          ]}
          disabled
        />
        <Input
          id="dateStart"
          label="Дата начала"
          onChange={() => {}}
          value={project.dateStart.toISOString().split("T")[0]}
          type="text"
          disabled
          required={false}
        />
        <Input
          id="planeDateEnd"
          label="Дата план. завершения"
          onChange={() => {}}
          value={project.planeDateEnd.toISOString().split("T")[0]}
          type="text"
          disabled
          required={false}
        />
        <Input
          id="status"
          label="Статус проекта"
          onChange={() => {}}
          value={project.status}
          type="text"
          disabled
          required={false}
          color={PROJECT_STATUSES_COLORS[project.status]}
        />
        <Input
          id="stage"
          label="Стадия проекта"
          onChange={() => {}}
          value={project.stage}
          type="text"
          disabled
          required={false}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          text="Изменить"
          onClick={onEditClick}
          type="filled"
          color="#FF5B2E"
        />
        <Button
          text="Назад"
          onClick={onCancelClick}
          type="outlined"
          color="rgba(210, 32, 67, 1)"
        />
      </div>
    </div>
  );
};
