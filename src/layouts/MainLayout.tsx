import React, { ReactNode, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { Link } from "../components/Link/Link";

// @ts-ignore
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, changeAuth, setUser } = useContext(AuthContext);

  const onLogout = () => {
    changeAuth(false);
    setUser(null);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>Logo</div>
        <div className={styles.center}>
          <Link path="/clients" title="Клиенты" />
          <Link path="/projects" title="Проекты" />
          <Link path="/analisys" title="Анализ" />
        </div>
        <div className={styles.right}>
          <div>{user?.name}</div>
          <button onClick={onLogout}>Выйти из аккаунта</button>
        </div>
      </header>
      <div style={{ paddingTop: 36 }}>{children}</div>
    </>
  );
};
