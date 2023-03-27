import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../../api/clientsApi";
import { ProjectsApi } from "../../../api/projectsApi";

import { useInput } from "../../../hooks/useInput";
import {
  ProjectStages,
  ProjectStatuses,
  ProjectType,
} from "../../../types/enums";
import { Client } from "../../../types/interfaces";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Select } from "../../Select/Select";

// @ts-ignore
import styles from "../ProjectForm.module.css";

export const ProjectCreateForm = () => {
  // Базовые инпуты
  const {
    hook: [name, onNameChange],
  } = useInput<string>("");
  const {
    hook: [dateStart, onDateStartChange],
  } = useInput<number>(Date.now());
  const {
    hook: [planeDateEnd, onPlaneDateEnd],
  } = useInput<number>(Date.now());

  // Селекты
  const typeOptions = Object.values(ProjectType);
  const [clientOptions, setClientsOptions] = useState<Client[]>([]);

  useEffect(() => {
    ClientsApi.getAllClients().then(setClientsOptions);
  }, []);

  const {
    hook: [type, onTypeChange],
  } = useInput<ProjectType>(ProjectType.redesign);
  const {
    hook: [client, onClientChange],
  } = useInput<number>(0);

  // Добавление клиента
  const navigate = useNavigate();

  const onAddClick = async () => {
    await ProjectsApi.createProject({
      clientId: client,
      dateStart: new Date(dateStart),
      planeDateEnd: new Date(planeDateEnd),
      type,
      dateEnd: null,
      name,
      stage: ProjectStages.requirements,
      status: ProjectStatuses.work,
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
          label="Тип Проекта"
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
      </div>
      <div className={styles.buttons}>
        <Button
          text="Добавить"
          onClick={onAddClick}
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
