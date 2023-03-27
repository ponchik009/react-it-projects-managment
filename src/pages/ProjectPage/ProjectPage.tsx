import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectsApi } from "../../api/projectsApi";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { ProjectEditForm } from "../../components/ProjectForm/ProjectEditForm/ProjectEditForm";
import { ProjectShowForm } from "../../components/ProjectForm/ProjectShowForm/ProjectShowForm";
import { Project } from "../../types/interfaces";

// @ts-ignore
import styles from "./ProjectPage.module.css";

export const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    ProjectsApi.getProject(+id!).then((result) =>
      setProject(result as Project)
    );
  }, [id]);

  return (
    <div className={styles.content}>
      <PageTitle
        title={isEditing ? "Изменение проекта" : "Информация о проекте"}
      />
      {project &&
        (isEditing ? (
          <ProjectEditForm project={project} />
        ) : (
          <ProjectShowForm
            project={project}
            onEditClick={() => setIsEditing(true)}
          />
        ))}
    </div>
  );
};
