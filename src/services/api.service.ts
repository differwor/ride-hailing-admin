import axiosInstance from '@/lib/01.axios';
import { AxiosError } from 'axios';
import _get from 'lodash/get';

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

export class ApiService {
  static async request<T>(
    method: string,
    url: string,
    data?: T
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
      });

      return {
        data: _get(response.data, 'data', response.data), // depend on api response format
        error: _get(response.data, 'error', null), 
        status: response.status,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          data: null,
          error: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        };
      }
      
      return {
        data: null,
        error: 'Unexpected error occurred',
        status: 500,
      };
    }
  }

  static async get<T>(url: string) {
    return this.request<T>('GET', url);
  }

  static async post<T>(url: string, data: T) {
    return this.request<T>('POST', url, data);
  }

  static async put<T>(url: string, data: T) {
    return this.request<T>('PUT', url, data);
  }

  static async delete<T>(url: string) {
    return this.request<T>('DELETE', url);
  }
}