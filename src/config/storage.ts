import * as SecureStore from 'expo-secure-store';

export const STORAGE_KEYS = {
  AUTH: '@auth',
  USER: '@user',
  TOKEN: '@token',
  SETTINGS: '@settings',
  CART: '@cart',
  FAVORITES: '@favorites',
} as const;

export const storageHelper = {
  // Token functions
  setAccessToken: async (token: string) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
  },
  getAccessToken: async () => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
  },
  setRefreshToken: async (token: string) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
  },
  getRefreshToken: async () => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
  },
  clearTokens: async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
  },

  // User data functions
  setUserData: async (data: any) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(data));
  },
  getUserData: async () => {
    const data = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  clearUserData: async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
  },

  // Clear all data (delete all keys)
  clearAll: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
      SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH),
      SecureStore.deleteItemAsync(STORAGE_KEYS.SETTINGS),
      SecureStore.deleteItemAsync(STORAGE_KEYS.CART),
      SecureStore.deleteItemAsync(STORAGE_KEYS.FAVORITES),
    ]);
  },
}; 