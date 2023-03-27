import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../../api/clientsApi";

import { CITIES, REGIONS } from "../../../const/const";
import { useInput } from "../../../hooks/useInput";
import { ClientType } from "../../../types/enums";
import { Client } from "../../../types/interfaces";
import { CityValues, RegionValues } from "../../../types/types";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Select } from "../../Select/Select";

// @ts-ignore
import styles from "../ClientForm.module.css";

interface ClientShowFormProps {
  onEditClick: () => void;
  client: Client;
}

export const ClientShowForm: React.FC<ClientShowFormProps> = ({
  onEditClick,
  client,
}) => {
  // Добавление клиента
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate("/clients");
  };

  return (
    <div className={styles.form}>
      <div className={styles.inputs}>
        <Input
          id="name"
          label="Наименование"
          onChange={() => {}}
          value={client.name}
          placeholder="Наименование клиента"
          type="text"
          disabled
          required={false}
        />
        <Select
          id="type"
          required={false}
          value={client.type}
          label="Тип лица"
          onChange={() => {}}
          options={[{ name: client.type, value: client.type }]}
          disabled
        />
        <Input
          id="email"
          label="e-mail"
          onChange={() => {}}
          value={client.email}
          placeholder="example@gmail.com"
          type="email"
          disabled
          required={false}
        />
        <Select
          id="region"
          required={false}
          value={client.region}
          label="Регион"
          onChange={() => {}}
          options={[{ name: client.region, value: client.region }]}
          disabled
        />
        <Select
          id="city"
          required={false}
          value={client.city}
          label="Город"
          onChange={() => {}}
          options={[{ name: client.city, value: client.city }]}
          disabled
        />
        <Input
          id="phone"
          label="Контактный телефон"
          onChange={() => {}}
          value={client.phone}
          type="tel"
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
          onClick={onBackClick}
          type="outlined"
          color="rgba(210, 32, 67, 1)"
        />
      </div>
    </div>
  );
};
