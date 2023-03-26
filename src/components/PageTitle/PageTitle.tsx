import React from "react";

//@ts-ignore
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h2 className={styles.title}>{title}</h2>;
};
