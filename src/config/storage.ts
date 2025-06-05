import * as SecureStore from 'expo-secure-store';

export const STORAGE_KEYS = {
  AUTH: 'auth',
  USER: 'user',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SETTINGS: 'settings',
  CART: 'cart',
  FAVORITES: 'favorites',
  USER_AGENT: 'user_agent'
} as const;


export const storageHelper = {
  // Token functions
  setAccessToken: async (token: string) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, token);
  },
  getAccessToken: async () => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
  },
  setRefreshToken: async (token: string) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, token);
  },
  getRefreshToken: async () => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  },
  clearTokens: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
    ]);
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
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
      SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH),
      SecureStore.deleteItemAsync(STORAGE_KEYS.SETTINGS),
      SecureStore.deleteItemAsync(STORAGE_KEYS.CART),
      SecureStore.deleteItemAsync(STORAGE_KEYS.FAVORITES),
    ]);
  },

  getOrCreateWebDeviceId() {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  },


  async getOrCreateMobileDeviceId() {
    let deviceId = await SecureStore.getItemAsync(STORAGE_KEYS.USER_AGENT);
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      SecureStore.setItemAsync(STORAGE_KEYS.USER_AGENT, deviceId);
    }
    return deviceId;
  },
  

}