import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../config/axios';
import { ErrorHandler, AppError } from '../types/error';
import { 
  ApiResponse, 
  PaginatedResponse, 
  InfiniteScrollResponse, 
  InfiniteScrollParams,
  PaginationParams,
  ApiError
} from './types';

class ApiClient {
  private handleError(error: any): ApiError {
    const appError = ErrorHandler.convertAPIError(error);
    return {
      message: appError.message,
      code: appError.code,
      details: appError.details
    };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Method for paginated responses (web)
  async getPaginated<T>(
    url: string, 
    params: PaginationParams,
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.get<PaginatedResponse<T>>(url, {
        ...config,
        params
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Method for infinite scroll (mobile)
  async getInfiniteScroll<T>(
    url: string, 
    params: InfiniteScrollParams,
    config?: AxiosRequestConfig
  ): Promise<InfiniteScrollResponse<T> | ApiError> {
    try {
      const response = await axiosInstance.get<InfiniteScrollResponse<T>>(url, {
        ...config,
        params
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const apiClient = new ApiClient(); 