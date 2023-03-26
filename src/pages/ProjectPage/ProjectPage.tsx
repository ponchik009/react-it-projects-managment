import React from "react";
import { useParams } from "react-router-dom";

export const ProjectPage = () => {
  const params = useParams();

  return <div>{params.id}</div>;
};
