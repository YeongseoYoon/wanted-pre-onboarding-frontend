import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../constants/constants";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    ContentType: "application/json",
  },
};

export const instance: AxiosInstance = axios.create(axiosConfig);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
