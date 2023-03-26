import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientsApi } from "../../api/clientsApi";
import { ClientEditForm } from "../../components/ClientForm/ClientEditForm/ClientEditForm";
import { ClientShowForm } from "../../components/ClientForm/ClientShowForm/ClientShowForm";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Client } from "../../types/interfaces";

// @ts-ignore
import styles from "./ClientPage.module.css";

export const ClientPage = () => {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    ClientsApi.getClient(+id!).then((result) => setClient(result as Client));
  }, [id]);

  return (
    <div className={styles.content}>
      <PageTitle
        title={isEditing ? "Изменение клиента" : "Информация о клиенте"}
      />
      {client &&
        (isEditing ? (
          <ClientEditForm client={client} />
        ) : (
          <ClientShowForm
            client={client}
            onEditClick={() => setIsEditing(true)}
          />
        ))}
    </div>
  );
};
