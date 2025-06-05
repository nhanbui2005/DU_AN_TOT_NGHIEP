import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import { RootStackParamList } from './types';
import { AuthRouter } from './AuthRouter';
import MainNavigator from './MainNavigation';
import { RootState } from '../store';
import { useAuth } from '../hooks/useAuth'; // <-- bạn đã viết hook này

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRouter = () => {
  const { loadAuthData } = useAuth();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const init = async () => {
      await loadAuthData(); 
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthRouter} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
