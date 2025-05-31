import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import ForgotPassword from "../screens/auth/ForgotPassword";
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import Verify from '../screens/auth/Verify';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={Verify} />
      {/* Add your auth screens here */}
    </Stack.Navigator>
  );
}; 