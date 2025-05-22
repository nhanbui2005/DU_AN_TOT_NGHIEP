import { MMKV } from 'react-native-mmkv';

export const STORAGE_KEYS = {
  AUTH: '@auth',
  USER: '@user',
  TOKEN: '@token',
  SETTINGS: '@settings',
  CART: '@cart',
  FAVORITES: '@favorites',
} as const;

export const storage = new MMKV({
  id: 'app-storage',
  encryptionKey: 'your-encryption-key'
});

export const storageHelper = {
  // Token functions
  setAccessToken: (token: string) => {
    storage.set(STORAGE_KEYS.TOKEN, token);
  },
  getAccessToken: () => {
    return storage.getString(STORAGE_KEYS.TOKEN);
  },
  setRefreshToken: (token: string) => {
    storage.set(STORAGE_KEYS.TOKEN, token);
  },
  getRefreshToken: () => {
    return storage.getString(STORAGE_KEYS.TOKEN);
  },
  clearTokens: () => {
    storage.delete(STORAGE_KEYS.TOKEN);
  },

  // User data functions
  setUserData: (data: any) => {
    storage.set(STORAGE_KEYS.USER, JSON.stringify(data));
  },
  getUserData: () => {
    const data = storage.getString(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  clearUserData: () => {
    storage.delete(STORAGE_KEYS.USER);
  },

  // Clear all data
  clearAll: () => {
    storage.clearAll();
  },
}; 