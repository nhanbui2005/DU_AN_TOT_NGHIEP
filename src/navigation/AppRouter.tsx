import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthRouter } from './AuthRouter';
<<<<<<< Updated upstream
import MainNavigator from './MainNavigation';
=======
import { ProductDetails } from "../screens/main/ProductDetails"
import { CardScreen } from "../screens/main/CardScreen"
import { NotificationsScreen } from "../screens/main/NotificationsScreen"
import {ProductSeach}from "../screens/main/ProductSeach"
import {HomeScreen} from "../screens/main/HomeScreen"
import MainNavigator from './main/MainNavigation';
import { FavouriteScreen } from "../screens/main/FavouriteScreen"
>>>>>>> Stashed changes

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRouter = () => {

  const isAuthenticated = true;

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
    // <FavouriteScreen/>

  );
}; 