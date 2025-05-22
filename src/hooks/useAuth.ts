import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../api/services/auth.service';
import { LoginDto, RegisterDto, UserDto } from '../api/dto/auth.dto';
import { login as loginAction, logout as logoutAction } from '../store/slices/authSlice';
import { RootState } from '../store';
import { storage, STORAGE_KEYS } from '../config/storage';

interface AuthStorage {
  token: string;
  user: UserDto;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const saveAuthData = useCallback((data: AuthStorage) => {
    storage.set(STORAGE_KEYS.AUTH, JSON.stringify(data));
  }, []);

  const clearAuthData = useCallback(() => {
    storage.delete(STORAGE_KEYS.AUTH);
  }, []);

  const loadAuthData = useCallback(() => {
    const data = storage.getString(STORAGE_KEYS.AUTH);
    if (data) {
      const { user, token } = JSON.parse(data) as AuthStorage;
      dispatch(loginAction(user));
      return { user, token };
    }
    return null;
  }, [dispatch]);

  const login = useCallback(async (data: LoginDto) => {
    try {
      const response = await authService.login(data);
      if ('data' in response) {
        const { user, token } = response.data;
        // Lưu vào MMKV
        saveAuthData({ user, token });
        dispatch(loginAction(user));
        return { success: true, data: response.data };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch, saveAuthData]);

  const register = useCallback(async (data: RegisterDto) => {
    try {
      const response = await authService.register(data);
      if ('data' in response) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await authService.logout();
      if ('data' in response) {
        // Xóa khỏi MMKV
        clearAuthData();
        dispatch(logoutAction());
        return { success: true };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch, clearAuthData]);

  const getProfile = useCallback(async () => {
    try {
      const response = await authService.getProfile();
      if ('data' in response) {
        // Cập nhật MMKV
        const currentData = storage.getString(STORAGE_KEYS.AUTH);
        if (currentData) {
          const { token } = JSON.parse(currentData) as AuthStorage;
          saveAuthData({ user: response.data, token });
        }
        dispatch(loginAction(response.data));
        return { success: true, data: response.data };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch, saveAuthData]);

  const updateProfile = useCallback(async (data: Partial<UserDto>) => {
    try {
      const response = await authService.updateProfile(data);
      if ('data' in response) {
        // Cập nhật MMKV
        const currentData = storage.getString(STORAGE_KEYS.AUTH);
        if (currentData) {
          const { token } = JSON.parse(currentData) as AuthStorage;
          saveAuthData({ user: response.data, token });
        }
        dispatch(loginAction(response.data));
        return { success: true, data: response.data };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch, saveAuthData]);

  const changePassword = useCallback(async (data: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await authService.changePassword(data);
      if ('data' in response) {
        return { success: true };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      const response = await authService.forgotPassword(email);
      if ('data' in response) {
        return { success: true };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const resetPassword = useCallback(async (data: { token: string; newPassword: string }) => {
    try {
      const response = await authService.resetPassword(data);
      if ('data' in response) {
        return { success: true };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    loadAuthData
  };
}; 