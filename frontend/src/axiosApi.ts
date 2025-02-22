import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiURL } from './globalConstants.ts';
import { RootState } from './app/store.ts';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptor = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

export default axiosApi;