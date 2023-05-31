/* eslint-disable no-console */
import api from "./AuthAxios";

export default class AuthService {
  static async registration(email, password) {
    const result = {
      hasError: false,
      errorMessage: "",
    };
    try {
      const response = await api.post("/signup", { email, password });

      localStorage.setItem("token", response.data.accessToken);
    } catch (err) {
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }

  static async login(email, password) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.post("/signin", { email, password });

      const { role, isActivated, accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      result.data = { email, role, isActivated };
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err);
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
    } catch (err) {
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err);
    }

    return result;
  }

  static async checkAuth() {
    return api.get("/refresh");
  }
}
