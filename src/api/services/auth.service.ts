import { apiClient } from '../client';
import { ApiResponse, ApiError } from '../types';
import { LoginDto, RegisterDto, UserDto } from '../dto/auth.dto';

export class AuthService {
  private static instance: AuthService;
  private readonly BASE_URL = '/auth';

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginDto): Promise<ApiResponse<{ token: string; user: UserDto }> | ApiError> {
    return apiClient.post(`${this.BASE_URL}/login`, data);
  }

  async register(data: RegisterDto): Promise<ApiResponse<UserDto> | ApiError> {
    return apiClient.post(`${this.BASE_URL}/register`, data);
  }

  async getProfile(): Promise<ApiResponse<UserDto> | ApiError> {
    return apiClient.get(`${this.BASE_URL}/profile`);
  }

  async updateProfile(data: Partial<UserDto>): Promise<ApiResponse<UserDto> | ApiError> {
    return apiClient.put(`${this.BASE_URL}/profile`, data);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<void> | ApiError> {
    return apiClient.post(`${this.BASE_URL}/change-password`, data);
  }

  async forgotPassword(email: string): Promise<ApiResponse<void> | ApiError> {
    return apiClient.post(`${this.BASE_URL}/forgot-password`, { email });
  }

  async resetPassword(data: { token: string; newPassword: string }): Promise<ApiResponse<void> | ApiError> {
    return apiClient.post(`${this.BASE_URL}/reset-password`, data);
  }

  async logout(): Promise<ApiResponse<void> | ApiError> {
    return apiClient.post(`${this.BASE_URL}/logout`);
  }
}

export const authService = AuthService.getInstance(); 