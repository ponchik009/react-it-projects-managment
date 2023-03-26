import React from "react";
import { NavLink } from "react-router-dom";

//@ts-ignore
import styles from "./Link.module.css";

interface LinkProps {
  path: string;
  title: string;
}

export const Link: React.FC<LinkProps> = ({ path, title }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive ? styles.activeLink : "";
      }}
      style={{ cursor: "pointer" }}
      to={path}
    >
      {title}
    </NavLink>
  );
};
