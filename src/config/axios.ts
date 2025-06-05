import axios, { 
  AxiosError, 
  AxiosInstance, 
  InternalAxiosRequestConfig,
  AxiosResponse 
} from 'axios';
import { Platform } from 'react-native';
import { storageHelper } from './storage';
import { ErrorHandler, APIErrorCode } from '../types/error';

// Base URL configuration
export const BASE_URL = Platform.select({
  ios: 'https://pet-shop-api-server.onrender.com',
  android: 'https://pet-shop-api-server.onrender.com',
  default: 'https://pet-shop-api-server.onrender.com',
});

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     try {
//       // Get token from MMKV storage
//       const token = storageHelper.getAccessToken();
      
//       // If token exists, add to headers
//       if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
      
//       return config;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   (error: AxiosError) => {
//     return Promise.reject(ErrorHandler.convertAPIError(error));
//   }
// );

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && originalRequest) {
      try {
        // Get refresh token from MMKV
        const refreshToken = await storageHelper.getRefreshToken();
        
        if (refreshToken) {
          // Call refresh token API
          const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });
          
          const { accessToken, newRefreshToken } = response.data;
          
          // Save new tokens to MMKV
          storageHelper.setAccessToken(accessToken);
          storageHelper.setRefreshToken(newRefreshToken);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        storageHelper.clearTokens();
        return Promise.reject(ErrorHandler.convertAPIError({
          code: APIErrorCode.TOKEN_EXPIRED,
          message: 'Phiên đăng nhập đã hết hạn',
          timestamp: new Date().toISOString(),
        }));
      }
    }
    
    return Promise.reject(ErrorHandler.convertAPIError(error));
  }
);

export default axiosInstance; 