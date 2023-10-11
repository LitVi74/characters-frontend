import { AxiosError } from "axios";
import api from "./AuthAxios";
import { IUser } from "../../constants/constants";
import { ServicePrototype, Result } from "../ServicePrototype";

export default class AuthService extends ServicePrototype {
  static async registration(email: string, password: string) {
    const result: Result<IUser> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };
    try {
      const response = await api.post<IUser>("/signup", { email, password });

      if(response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async login(email: string, password: string) {
    const result: Result<IUser> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.post<IUser>("/signin", { email, password });

      if(response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async logout() {
    const result: Result<IUser> = {
      hasError: false,
      errorMessage: "",
      data: null,
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
    const result: Result<IUser> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.get<IUser>("/refresh");

      if(response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }
}
