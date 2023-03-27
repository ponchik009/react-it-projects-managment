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
  const {
    hook: [search, onSearchChange],
  } = useInput<string>("");
  const cityOptions = ["Все", ...Object.values(CITIES).flat()];
  const typeOptions = ["Все", ...Object.values(ClientType)];

  const {
    hook: [currentCity, onCityChange],
  } = useInput<CityValues | "Все">("Все");

  const {
    hook: [currentType, onTypeChange],
  } = useInput<ClientType | "Все">("Все");

  useEffect(() => {
    ClientsApi.getAllClients(search, {
      cities: currentCity === "Все" ? [] : [currentCity],
      types: currentType === "Все" ? [] : [currentType],
    }).then(setClients);
  }, [search, currentCity, currentType]);

  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <PageTitle title="Клиенты" />
        <ClientsList clients={clients} />
        <Button color="#219653" text="Добавить" onClick={onAddClick} />
      </div>
      <div className={styles.right}>
        <input
          type="text"
          value={search}
          onChange={onSearchChange}
          id="search"
          placeholder="Поиск..."
        />
        <span>Фильтры</span>
        <label htmlFor="city">
          Город
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
        </label>
        <label htmlFor="type">
          Тип клиента
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
        </label>
      </div>
    </div>
  );
};
