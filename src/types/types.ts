import { CITIES, CITIES_NAMES, REGIONS } from "../const/const";
import { ClientType, ProjectStatuses, ProjectType } from "./enums";

export type RegionKeys = keyof typeof REGIONS;
export type RegionValues = typeof REGIONS[RegionKeys];

export type CityKeys = keyof typeof CITIES;
export type CityValues = typeof CITIES_NAMES[number];

export type ClientFilters = {
  cities: CityValues[];
  types: ClientType[];
};

export type ProjectFilters = {
  statuses: ProjectStatuses[];
  types: ProjectType[];
  clients: number[];
  date: {
    from: Date;
    to: Date;
  } | null;
};
