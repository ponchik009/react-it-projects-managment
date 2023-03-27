import { ProjectStages, ProjectStatuses } from "../types/enums";

export const REGIONS = {
  MOSCOW_REGION: "Московсая область",
  IRKUTSK_REGION: "Иркутская область",
} as const;

export const CITIES = {
  [REGIONS.MOSCOW_REGION]: ["Москва", "Иваново"],
  [REGIONS.IRKUTSK_REGION]: ["Иркутск", "Ангарск", "Братск", "Усть-Илимск"],
} as const;

export const CITIES_NAMES = [
  ...CITIES[REGIONS.IRKUTSK_REGION],
  ...CITIES[REGIONS.MOSCOW_REGION],
];

export const PROJECT_STAGES_ORDER = {
  [ProjectStages.requirements]: {
    name: ProjectStages.requirements,
    order: 0,
  },
  [ProjectStages.design]: {
    name: ProjectStages.design,
    order: 1,
  },
  [ProjectStages.development]: {
    name: ProjectStages.development,
    order: 2,
  },
  [ProjectStages.testing]: {
    name: ProjectStages.testing,
    order: 3,
  },
  [ProjectStages.ended]: {
    name: ProjectStages.ended,
    order: 4,
  },
} as const;

export const PROJECT_STATUSES_COLORS = {
  [ProjectStatuses.work]: "#FF5B2E",
  [ProjectStatuses.ended]: "#219653",
  [ProjectStatuses.rejected]: "#D22043",
};

export const RADIAN = Math.PI / 180;

export const CLIENT_TYPE_COLORS = ["#0263FF", "#FF7723"];

export const PROJECT_TYPE_COLORS = [
  "#0263FF",
  "#FF7723",
  "#8E30FF",
  "#C06950",
  "rgba(29, 34, 45, 0.5)",
  "#219654",
];
