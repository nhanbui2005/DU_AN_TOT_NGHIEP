import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../api/services/auth.service';
import { LoginDto, RegisterDto } from '../api/dto/auth.dto';
import { login as loginAction, logout as logoutAction } from '../store/slices/authSlice';
import { RootState } from '../store';
import { storageHelper } from '../config/storage';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const loadAuthData = useCallback(async () => {
    console.log('Loading auth data...');

    const accessToken = await storageHelper.getAccessToken();
    const refreshToken = await storageHelper.getRefreshToken();

    console.log('Access:', accessToken);
    console.log('Refresh:', refreshToken);

    if (accessToken && refreshToken) {
      dispatch(loginAction({ accessToken, refreshToken }));
      return { accessToken };
    }

    return null;
  }, [dispatch]);

  const login = useCallback(
    async (data: LoginDto) => {
      try {
        const response = await authService.login(data);
        
        if ('data' in response) {
          const { accessToken, refreshToken } = response.data;

          await storageHelper.setAccessToken(accessToken);
          await storageHelper.setRefreshToken(refreshToken);

          dispatch(loginAction({ accessToken: accessToken, refreshToken: refreshToken }));

          return { success: true, data: response.data };
        }
        return { success: false, error: response };
      } catch (error) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

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
        await storageHelper.clearAll();
        dispatch(logoutAction());
        return { success: true };
      }
      return { success: false, error: response };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);

  return {
    isAuthenticated,
    login,
    register,
    logout,
    loadAuthData,
  };
};
