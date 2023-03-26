import { ClientCreateForm } from "../../components/ClientForm/ClientCreateForm/ClientCreateForm";
import { PageTitle } from "../../components/PageTitle/PageTitle";

// @ts-ignore
import styles from "./CreateClientPage.module.css";

export const CreateClientPage = () => {
  return (
    <div className={styles.content}>
      <PageTitle title="Создание клиента" />
      <ClientCreateForm />
    </div>
  );
};
