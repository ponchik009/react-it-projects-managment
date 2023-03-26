import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsApi } from "../../../api/clientsApi";

import { CITIES, REGIONS } from "../../../const/const";
import { useInput } from "../../../hooks/useInput";
import { ClientType } from "../../../types/enums";
import { CityValues, RegionValues } from "../../../types/types";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Select } from "../../Select/Select";

// @ts-ignore
import styles from "../ClientForm.module.css";

export const ClientCreateForm = () => {
  // Базовые инпуты
  const {
    hook: [name, onNameChange],
  } = useInput<string>("");
  const {
    hook: [email, onEmailChange],
  } = useInput<string>("");
  const {
    hook: [phone, onPhoneChange],
  } = useInput<string>("");

  // Селекты
  const cityOptions = Object.values(CITIES).flat();
  const regionsOptions = Object.values(REGIONS);
  const typeOptions = Object.values(ClientType);

  const {
    hook: [type, onTypeChange],
  } = useInput<ClientType>(ClientType.law);
  const {
    hook: [region, onRegionChange],
  } = useInput<RegionValues>(regionsOptions[0]);
  const {
    hook: [city, onCityChange],
  } = useInput<CityValues>(cityOptions[0]!);

  // Добавление клиента
  const navigate = useNavigate();

  const onAddClick = async () => {
    await ClientsApi.createClient({
      city,
      email,
      name,
      phone,
      projects: [],
      region,
      type,
    });

    navigate("/clients");
  };

  const onCancelClick = () => {
    navigate("/clients");
  };

  return (
    <div className={styles.form}>
      <div className={styles.inputs}>
        <Input
          id="name"
          label="Наименование"
          onChange={onNameChange}
          value={name}
          placeholder="Введите наименование клиента"
          type="text"
        />
        <Select
          id="type"
          required
          value={type}
          label="Тип лица"
          onChange={onTypeChange}
          options={typeOptions.map((option) => ({
            name: option,
            value: option,
          }))}
        />
        <Input
          id="email"
          label="e-mail"
          onChange={onEmailChange}
          value={email}
          placeholder="example@gmail.com"
          type="email"
        />
        <Select
          id="region"
          required
          value={region}
          label="Регион"
          onChange={onRegionChange}
          options={regionsOptions.map((option) => ({
            name: option,
            value: option,
          }))}
        />
        <Select
          id="city"
          required
          value={city}
          label="Город"
          onChange={onCityChange}
          options={CITIES[region].map((option) => ({
            name: option,
            value: option,
          }))}
        />
        <Input
          id="phone"
          label="Контактный телефон"
          onChange={onPhoneChange}
          value={phone}
          type="tel"
        />
      </div>
      <div className={styles.buttons}>
        <Button
          text="Добавить"
          onClick={onAddClick}
          type="filled"
          color="#219653"
        />
        <Button
          text="Отменить"
          onClick={onCancelClick}
          type="filled"
          color="#FF5B2E"
        />
      </div>
    </div>
  );
};
