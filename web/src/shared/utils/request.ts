import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import tokenHandler from "@shared/utils/tokenHandler";

const axiosInstance: AxiosInstance = axios.create();

const makeRequest = (instance: AxiosInstance) => (method: string, url: string, params: unknown) => {
  // @ts-ignore
  return instance[method](url, ...params);
};

axiosInstance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const token = tokenHandler.get();
  if (token) {
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const response = res.data || res;
    if (response.error) {
      return Promise.reject(response.error);
    }

    return response;
  },
  (error: AxiosError) => {
    const { response } = error || {};
    const { data } = response || {};

    if (data) {
      return Promise.reject(data);
    }

    return Promise.reject(error);
  },
);

/**
 * Axios wrapper
 *
 * @param  {string} method Method of the request
 * @param  {string} url url of the request
 *
 * @return {object} wrapped axios function that receives params
 */
export default (method: string, url: string) =>
  (...params: unknown[]) => {
    return makeRequest(axiosInstance)(method, url, params);
  };
