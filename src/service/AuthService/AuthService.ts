import { AxiosError } from "axios";
import api from "./AuthAxios";
import { IUser } from "../../constants/constants";
import ServicePrototype from "../ServicePrototype";

export default class AuthService extends ServicePrototype {
  static async registration(email: string, password: string) {
    const result = {
      hasError: false,
      errorMessage: "",
    };
    try {
      const response = await api.post<IUser>("/signup", { email, password });

      localStorage.setItem("token", response.data.accessToken);
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async login(email: string, password: string) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.post<IUser>("/signin", { email, password });

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, role, isActivated, accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      result.data = { _id, email, role, isActivated };
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async logout() {
    const result = {
      hasError: false,
      errorMessage: "",
    };

    try {
      const response = await api.post("/signout");

      if (response.status === 200) {
        localStorage.removeItem("token");
      }
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async checkAuth() {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.get<IUser>("/refresh");

      const { _id, email, role, isActivated, accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      result.data = { _id, email, role, isActivated };
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }
}
