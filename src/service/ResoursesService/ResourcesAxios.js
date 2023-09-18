import axios from "axios";

import AuthService from "../AuthService/AuthService";

import { API_URL } from "../../constants/constants";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const conf = config;
  conf.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return conf;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      const response = await AuthService.checkAuth();

      if (response.hasError) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      }
    }
    throw error;
  }
);

export default api;
