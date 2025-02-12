import axiosInstance from "@/lib/01.axios";
import { ApiResponse, QueryParams } from "@/types/api";
import { AxiosError } from "axios";
import _get from "lodash/get";

export class ApiService {
  static async request<T>(
    method: string,
    url: string,
    data?: unknown,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
      });

      return {
        data: _get(response.data, "data", response.data), // depend on api response format
        error: _get(response.data, "error", null),
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
        error: "Unexpected error occurred",
        status: 500,
      };
    }
  }

  static async get<T>(url: string, params?: QueryParams) {
    // Remove params that have null/undefine value
    const queryString = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([, value]) => value !== null && value !== undefined)
            .map(([key, value]) => [key, String(value)]),
        ).toString()}`
      : "";
    return this.request<T>("GET", `${url}${queryString}`);
  }

  static async post<T>(url: string, data: unknown) {
    return this.request<T>("POST", url, data);
  }

  static async put<T>(url: string, data: unknown) {
    return this.request<T>("PUT", url, data);
  }

  static async delete<T>(url: string) {
    return this.request<T>("DELETE", url);
  }
}
