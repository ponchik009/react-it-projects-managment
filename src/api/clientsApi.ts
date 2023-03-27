import { ClientType } from "../types/enums";
import { Client } from "../types/interfaces";
import { ClientFilters } from "../types/types";

export class ClientsApi {
  private static clients: Client[] = [
    {
      id: 0,
      name: "ООО Чикиряу",
      email: "a@a.c",
      phone: "79005553535",
      type: ClientType.law,
      city: "Иркутск",
      region: "Иркутская область",
      projects: [0],
    },
    {
      id: 1,
      name: "ПАО Аптека",
      email: "b@b.b",
      phone: "79005553636",
      type: ClientType.law,
      city: "Москва",
      region: "Московсая область",
      projects: [1, 2],
    },
    {
      id: 2,
      name: "Петров П.А.",
      email: "c@c.c",
      phone: "79005553737",
      type: ClientType.phys,
      city: "Ангарск",
      region: "Иркутская область",
      projects: [],
    },
  ];

  public static async getAllClients(
    search: string = "",
    filters: ClientFilters = { cities: [], types: [] }
  ): Promise<Client[]> {
    const searchedClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredByCityClients =
      filters.cities.length > 0
        ? searchedClients.filter((client) =>
            filters.cities.includes(client.city)
          )
        : searchedClients;

    const filteredByTypeClients =
      filters.types.length > 0
        ? filteredByCityClients.filter((client) =>
            filters.types.includes(client.type)
          )
        : filteredByCityClients;

    return new Promise((resolve) => resolve(filteredByTypeClients));
  }

  public static async getClient(id: number): Promise<Client | string> {
    const hasProject = id >= 0 && id < this.clients.length;

    return new Promise((resolve, reject) =>
      hasProject ? resolve(this.clients[id]) : reject("Клиент не найден")
    );
  }

  public static async createClient(
    client: Omit<Client, "id">
  ): Promise<Client | string> {
    const hasName = this.clients.some((c) => c.name === client.name);

    return new Promise((resolve, reject) => {
      if (hasName) {
        reject("Клиент с таким именем уже существует");
      }

      const newClient = { ...client, id: this.clients.length };
      this.clients.push(newClient);
      resolve(newClient);
    });
  }

  public static async updateClient(
    id: number,
    client: Omit<Client, "id">
  ): Promise<Client | string> {
    const hasCLient = id >= 0 && id < this.clients.length;

    return new Promise((resolve, reject) => {
      if (!hasCLient) {
        reject("Клиент с таким id не найден!");
      }

      this.clients[id] = {
        ...this.clients[id],
        ...client,
      };
      resolve(this.clients[id]);
    });
  }
}
