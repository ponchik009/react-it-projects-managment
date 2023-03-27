import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../../api/clientsApi";
import { ProjectsApi } from "../../../api/projectsApi";

import {
  PROJECT_STAGES_ORDER,
  PROJECT_STATUSES_COLORS,
} from "../../../const/const";
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

interface ProjectEditFormProps {
  project: Project;
}

export const ProjectEditForm: React.FC<ProjectEditFormProps> = ({
  project,
}) => {
  // Базовые инпуты
  const {
    hook: [name, onNameChange],
  } = useInput<string>(project.name);
  const {
    hook: [dateStart, onDateStartChange],
  } = useInput<string>(project.dateStart.toISOString().split("T")[0]);
  const {
    hook: [planeDateEnd, onPlaneDateEnd],
  } = useInput<string>(project.planeDateEnd.toISOString().split("T")[0]);

  const [status, setStatus] = useState<ProjectStatuses>(project.status);

  // Селекты
  const typeOptions = Object.values(ProjectType);
  const [clientOptions, setClientsOptions] = useState<Client[]>([]);
  const stageOptions = Object.values(ProjectStages);

  useEffect(() => {
    ClientsApi.getAllClients().then(setClientsOptions);
  }, []);

  const {
    hook: [type, onTypeChange],
  } = useInput<ProjectType>(project.type);
  const {
    hook: [client, onClientChange],
  } = useInput<number>(project.clientId);
  const {
    hook: [stage, onStageChange],
  } = useInput<ProjectStages>(project.stage);

  const onStageChangeInterceptor = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === PROJECT_STAGES_ORDER[ProjectStages.ended].name) {
      setStatus(ProjectStatuses.ended);
    } else if (!Object.keys(PROJECT_STAGES_ORDER).includes(e.target.value)) {
      setStatus(ProjectStatuses.rejected);
    } else {
      setStatus(ProjectStatuses.work);
    }

    onStageChange(e);
  };

  // Добавление клиента
  const navigate = useNavigate();

  const onSaveClick = async () => {
    await ProjectsApi.updateProject(project.id, {
      id: project.id,
      clientId: client,
      dateStart: new Date(dateStart),
      planeDateEnd: new Date(planeDateEnd),
      type,
      dateEnd:
        status === ProjectStatuses.ended || status === ProjectStatuses.rejected
          ? new Date(Date.now())
          : null,
      name,
      stage: stage,
      status: status,
    });

    navigate("/projects");
  };

  const onCancelClick = () => {
    navigate("/projects");
  };

  return (
    <div className={styles.form}>
      <div className={styles.inputs}>
        <Input
          id="name"
          label="Наименование"
          onChange={onNameChange}
          value={name}
          placeholder="Введите наименование клиента"
          type="text"
        />
        <Select
          id="client"
          required
          value={client}
          label="Заказчик"
          onChange={onClientChange}
          options={clientOptions.map((option) => ({
            name: option.name,
            value: option.id,
          }))}
        />
        <Select
          id="type"
          required
          value={type}
          label="Тип проекта"
          onChange={onTypeChange}
          options={typeOptions.map((option) => ({
            name: option,
            value: option,
          }))}
        />
        <Input
          id="dateStart"
          label="Дата начала"
          onChange={onDateStartChange}
          value={dateStart}
          type="date"
        />
        <Input
          id="planeDateEnd"
          label="Дата план. завершения"
          onChange={onPlaneDateEnd}
          value={planeDateEnd}
          type="date"
        />
        <Input
          id="status"
          label="Статус проекта"
          onChange={() => {}}
          value={status}
          type="text"
          disabled
          color={PROJECT_STATUSES_COLORS[status]}
        />
        <Select
          id="stage"
          required
          value={stage}
          label="Стадия проекта"
          onChange={onStageChangeInterceptor}
          options={stageOptions.map((option) => ({
            name: option,
            value: option,
          }))}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          text="Сохранить"
          onClick={onSaveClick}
          type="filled"
          color="#219653"
        />
        <Button
          text="Отменить"
          onClick={onCancelClick}
          type="filled"
          color="#FF5B2E"
        />
      </div>
    </div>
  );
};
