import {
  ClientType,
  ProjectStages,
  ProjectStatuses,
  ProjectType,
} from "./enums";
import { CityValues, RegionValues } from "./types";

export interface LoginDto {
  login: string;
  password: string;
}

export interface Admin {
  name: string;
  login: string;
  password: string;
}

export interface Client {
  id: number;
  name: string;
  type: ClientType;
  email: string;
  region: RegionValues;
  city: CityValues;
  phone: string;
  projects: number[];
}

export interface Project {
  id: number;
  name: string;
  clientId: number;
  type: ProjectType;
  dateStart: Date;
  planeDateEnd: Date;
  dateEnd: Date | null;
  stage: ProjectStages;
  status: ProjectStatuses;
}
