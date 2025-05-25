import axios from 'axios';

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export interface ResetPasswordRequest {
  phone: string;
  otp: string;
  newPassword: string;
}

const authApi = {
  login: async (data: LoginRequest) => {
    const response = await axios.post(`/auth/login`, data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await axios.post(`/auth/register`, data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await axios.post(`/auth/forgot-password`, data);
    return response.data;
  },

  verifyOTP: async (data: VerifyOTPRequest) => {
    const response = await axios.post(`/auth/verify-otp`, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await axios.post(`/auth/reset-password`, data);
    return response.data;
  },
};

export default authApi; 