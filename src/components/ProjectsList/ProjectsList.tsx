import React from "react";
import { ClientsApi } from "../../api/clientsApi";
import { Project } from "../../types/interfaces";
import { ProjecsItem } from "./ProjecsItem";

// @ts-ignore
import styles from "./ProjectsList.module.css";

export interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div className={styles.list}>
      {projects.map((project) => (
        <ProjecsItem project={project} key={project.id} />
      ))}
    </div>
  );
};
