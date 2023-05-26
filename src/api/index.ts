import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { PaginatedResponse } from "./models/Response";
import { UserItem } from "./models/Users";
export const BASE_URL = "https://test.relabs.ru";

const axiosInstance = axios.create({ baseURL: BASE_URL });
export const api = {
  user: {
    login: async (data: { email: string; password: string }) => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 2000)
      );
    },
  },
  users: {
    get: async (
      params: AxiosRequestConfig
    ): Promise<AxiosResponse<PaginatedResponse<UserItem>>> =>
      axiosInstance.get("api/users/list", params),
  },
};
