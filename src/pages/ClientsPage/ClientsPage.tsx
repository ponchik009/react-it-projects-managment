import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../api/clientsApi";
import { Button } from "../../components/Button/Button";
import { ClientsList } from "../../components/ClientsList/ClientsList";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { CITIES } from "../../const/const";
import { useInput } from "../../hooks/useInput";
import { ClientType } from "../../types/enums";
import { Client } from "../../types/interfaces";
import { CityValues } from "../../types/types";

//@ts-ignore
import styles from "./ClientsPage.module.css";

export const ClientsPage = () => {
  const navigate = useNavigate();

  const onAddClick = () => navigate("/clients/create");

  // Клиенты
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    ClientsApi.getAllClients().then(setClients);
  }, []);

  // Фильтры
  const cityOptions = Object.values(CITIES).flat();
  const typeOptions = Object.values(ClientType);

  const {
    hook: [currentCity, onCityChange],
  } = useInput<CityValues>(cityOptions[0]);

  const {
    hook: [currentType, onTypeChange],
  } = useInput<ClientType>(ClientType.law);

  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <PageTitle title="Клиенты" />
        <ClientsList clients={clients} />
        <Button color="#219653" text="Добавить" onClick={onAddClick} />
      </div>
      <div className={styles.right}>
        <input type="text" name="search" id="search" placeholder="Поиск..." />
        <span>Фильтры</span>
        <select
          name="city"
          id="city"
          value={currentCity}
          onChange={onCityChange}
        >
          {cityOptions.map((cityOption) => (
            <option value={cityOption} key={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
        <select
          name="type"
          id="type"
          value={currentType}
          onChange={onTypeChange}
        >
          {typeOptions.map((typeOption) => (
            <option value={typeOption} key={typeOption}>
              {typeOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
