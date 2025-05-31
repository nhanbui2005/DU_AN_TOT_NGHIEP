import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ProductDetails } from '@/src/screens/main/ProductDetails';
import { CheckoutScreen } from '@/src/screens/main/CheckOut';
import { NotificationsScreen } from '@/src/screens/main/NotificationsScreen';
import { CardScreen } from '@/src/screens/main/CardScreen';
import { MainStackParamList } from './types';
import TabNavigator from './bottomTab/TabNavigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {   
  
  return (
    <Stack.Navigator screenOptions={{animation: 'fade'}}>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartScreen"
        component={CardScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;