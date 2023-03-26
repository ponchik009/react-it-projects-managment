import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../api/clientsApi";
import { PROJECT_STATUSES_COLORS } from "../../const/const";
import { Client, Project } from "../../types/interfaces";

// @ts-ignore
import styles from "./ProjectsList.module.css";

interface ProjectItemProps {
  project: Project;
}

export const ProjecsItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    ClientsApi.getClient(project.clientId).then((result) =>
      setClient(result as Client)
    );
  }, []);

  const navigate = useNavigate();
  const onProjectClick = () => navigate(`/projects/${project.id}`);

  return (
    <div className={styles.item} onClick={onProjectClick}>
      <div className={styles.item_left}>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.additional}>{client?.name}</span>
      </div>
      <span
        className={styles.additional}
        style={{ color: PROJECT_STATUSES_COLORS[project.status] }}
      >
        {project.status}
      </span>
    </div>
  );
};
