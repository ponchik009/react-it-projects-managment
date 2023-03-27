import React from "react";

import { PageTitle } from "../../components/PageTitle/PageTitle";
import { ProjectCreateForm } from "../../components/ProjectForm/ProjectCreateForm/ProjectCreateForm";

// @ts-ignore
import styles from "./CreateProjectPage.module.css";

export const CreateProjectPage = () => {
  return (
    <div className={styles.content}>
      <PageTitle title="Создание проекта" />
      <ProjectCreateForm />
    </div>
  );
};
