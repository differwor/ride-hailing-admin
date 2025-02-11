import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;