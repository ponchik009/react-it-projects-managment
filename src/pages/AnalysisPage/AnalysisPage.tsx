import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { useInput } from "../../hooks/useInput";

// @ts-ignore
import styles from "./AnalysisPage.module.css";

export const AnalysisPage = () => {
  const {
    hook: [dateStart, onDateStartChange],
  } = useInput<string>(new Date(Date.now()).toISOString().split("T")[0]);
  const {
    hook: [dateEnd, onDateEndChange],
  } = useInput<string>(new Date(Date.now()).toISOString().split("T")[0]);

  const navigate = useNavigate();

  const onGetClick = () => {
    navigate(`/analysis/get?dateStart=${dateStart}&dateEnd=${dateEnd}`);
  };

  return (
    <div className={styles.content}>
      <PageTitle title="Анализ проектов" />
      <div className={styles.datesInput}>
        <div className={styles.dates}>
          <Input
            id="dateStart"
            label="Дата от: "
            required={false}
            value={dateStart}
            onChange={onDateStartChange}
            type="date"
          />
          <Input
            id="dateEnd"
            label="Дата до: "
            required={false}
            value={dateEnd}
            onChange={onDateEndChange}
            type="date"
          />
        </div>
        <Button
          text="Получить"
          color="#219653"
          type="filled"
          onClick={onGetClick}
        />
      </div>
    </div>
  );
};
