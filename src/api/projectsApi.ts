import { ProjectStages, ProjectStatuses, ProjectType } from "../types/enums";
import { Project } from "../types/interfaces";
import { ProjectFIlters } from "../types/types";

export class ProjectsApi {
  private static projects: Project[] = [
    {
      id: 0,
      name: "Редизайн ООО Чикиряу",
      clientId: 0,
      dateStart: new Date("2023-01-01"),
      dateEnd: null,
      type: ProjectType.redesign,
      planeDateEnd: new Date("2023-04-01"),
      stage: ProjectStages.development,
      status: ProjectStatuses.work,
    },
    {
      id: 1,
      name: "Автоматизация ПАО Аптека",
      clientId: 1,
      dateStart: new Date("2023-02-01"),
      dateEnd: null,
      type: ProjectType.automatization,
      planeDateEnd: new Date("2023-06-01"),
      stage: ProjectStages.design,
      status: ProjectStatuses.work,
    },
    {
      id: 2,
      name: "Интеграция модуля поставщика в ПАО Аптека",
      clientId: 1,
      dateStart: new Date("2023-03-01"),
      dateEnd: new Date("2023-03-25"),
      type: ProjectType.integration,
      planeDateEnd: new Date("2023-03-25"),
      stage: ProjectStages.ended,
      status: ProjectStatuses.ended,
    },
  ];

  public static async getAllProjects(
    search: string = "",
    filters: ProjectFIlters = { clients: [], types: [], statuses: [] }
  ): Promise<Project[]> {
    const searchedProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredByClientProjects =
      filters.clients.length > 0
        ? searchedProjects.filter((project) =>
            filters.clients.includes(project.clientId)
          )
        : searchedProjects;

    const filteredByTypeClients =
      filters.types.length > 0
        ? filteredByClientProjects.filter((project) =>
            filters.types.includes(project.type)
          )
        : filteredByClientProjects;

    const filteredByStatusClients =
      filters.statuses.length > 0
        ? filteredByTypeClients.filter((project) =>
            filters.statuses.includes(project.status)
          )
        : filteredByTypeClients;

    return new Promise((resolve) => resolve(filteredByStatusClients));
  }

  public static async getProject(id: number): Promise<Project | string> {
    const hasProject = id >= 0 && id < this.projects.length;

    return new Promise((resolve, reject) =>
      hasProject ? resolve(this.projects[id]) : reject("Проект не найден")
    );
  }

  public static async createProject(
    project: Omit<Project, "id">
  ): Promise<Project | string> {
    const hasName = this.projects.some((p) => p.name === project.name);

    return new Promise((resolve, reject) => {
      if (hasName) {
        reject("Проект с таким именем уже существует");
      }

      const newProject = { ...project, id: this.projects.length };
      this.projects.push(newProject);
      resolve(newProject);
    });
  }

  public static async updateProject(
    id: number,
    project: Project
  ): Promise<Project | string> {
    const hasProject = id >= 0 && id < this.projects.length;

    return new Promise((resolve, reject) => {
      if (!hasProject) {
        reject("Проект с таким id не найден!");
      }

      this.projects[id] = {
        ...this.projects[id],
        ...project,
      };
      resolve(this.projects[id]);
    });
  }
}
