import { Admin, LoginDto } from "../types/interfaces";

const login = "viktorbb";
const password = "qwerty";

const user = {
  name: "Виктор",
  login,
  password,
};

export class AuthApi {
  public static async login(loginData: LoginDto): Promise<Admin | string> {
    return new Promise((resolve, reject) => {
      loginData.login === login && loginData.password === password
        ? resolve(user)
        : reject("Неверный логин или пароль");
    });
  }
}
