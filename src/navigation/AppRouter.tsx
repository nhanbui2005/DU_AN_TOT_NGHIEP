import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthRouter } from './AuthRouter';
import { MainRouter } from './MainRouter';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRouter = () => {
  // Get auth state from Redux
  const isAuthenticated = useSelector((state: RootState) => state.auth?.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthRouter} />
        ) : (
          <Stack.Screen name="Main" component={MainRouter} />
        )} */}
                  <Stack.Screen name="Main" component={MainRouter} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}; 