import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../types/interfaces";

// @ts-ignore
import styles from "./ClientsList.module.css";

export interface ClientListProps {
  clients: Client[];
}

export const ClientsList: React.FC<ClientListProps> = ({ clients }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.list}>
      {clients.map((client) => (
        <div
          className={styles.item}
          key={client.id}
          onClick={() => navigate(`/clients/${client.id}`)}
        >
          <div className={styles.item_left}>
            <span className={styles.name}>{client.name}</span>
            <span className={styles.additional}>{client.city}</span>
          </div>
          <span className={styles.additional}>{client.type}</span>
        </div>
      ))}
    </div>
  );
};
