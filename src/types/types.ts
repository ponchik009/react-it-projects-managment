import { CITIES, CITIES_NAMES, REGIONS } from "../const/const";

export type RegionKeys = keyof typeof REGIONS;
export type RegionValues = typeof REGIONS[RegionKeys];

export type CityKeys = keyof typeof CITIES;
export type CityValues = typeof CITIES_NAMES[number];
