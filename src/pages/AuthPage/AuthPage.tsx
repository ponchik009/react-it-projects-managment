import React, { FormEvent, useContext, useState } from "react";
import { AuthApi } from "../../api/authApi";
import { AuthContext } from "../../App";
import { useInput } from "../../hooks/useInput";
import { Admin } from "../../types/interfaces";

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
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="login"
          id="login"
          value={login}
          onChange={setLogin}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={setPassword}
        />
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
};
