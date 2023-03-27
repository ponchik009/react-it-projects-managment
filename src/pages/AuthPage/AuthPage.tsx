import React, { FormEvent, useContext, useState } from "react";
import { AuthApi } from "../../api/authApi";
import { AuthContext } from "../../App";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { useInput } from "../../hooks/useInput";
import { Admin } from "../../types/interfaces";

// @ts-ignore
import styles from "./AuthPage.module.css";

export const AuthPage = () => {
  const {
    hook: [login, setLogin],
    reset: resetLogin,
  } = useInput<string>("");
  const {
    hook: [password, setPassword],
    reset: resetPassword,
  } = useInput<string>("");
  const [error, setError] = useState<string>();

  const { changeAuth, setUser } = useContext(AuthContext);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await AuthApi.login({ login, password });
      setError("");
      changeAuth(true);
      setUser(user as Admin);
    } catch (e) {
      setError(e as string);
      changeAuth(false);
    } finally {
      resetLogin();
      resetPassword();
    }
  };

  return (
    <div className={styles.page}>
      <PageTitle title="Вход" />
      <form onSubmit={onFormSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <input
          type="text"
          id="login"
          value={login}
          onChange={setLogin}
          placeholder="Логин"
          className={`${styles.input} ${error && styles.inputError}`}
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder="Пароль"
          className={`${styles.input} ${error && styles.inputError}`}
        />
        <div style={{ height: 24 }}></div>
        <Button
          text="Войти"
          onClick={onFormSubmit}
          color="#219653"
          type="filled"
        />
      </form>
    </div>
  );
};
