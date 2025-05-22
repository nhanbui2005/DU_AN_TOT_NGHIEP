import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from './types';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ShopScreen } from '../screens/main/ShopScreen';
import { BookingScreen } from '../screens/main/BookingScreen';
import { CardScreen } from '../screens/main/CardScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { Image } from 'react-native';
import { colors } from '../theme/colors';
import { assets } from '../theme/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainRouter = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = focused ? assets.icons.bottomTab.home.active : assets.icons.bottomTab.home.inactive;
              break;
            case 'Shop':
              iconSource = focused ? assets.icons.bottomTab.shop.active : assets.icons.bottomTab.shop.inactive;
              break;
            case 'Booking':
              iconSource = focused ? assets.icons.bottomTab.booking.active : assets.icons.bottomTab.booking.inactive;
              break;
            case 'Card':
              iconSource = focused ? assets.icons.bottomTab.card.active : assets.icons.bottomTab.card.inactive;
              break;
            case 'Profile':
              iconSource = focused ? assets.icons.bottomTab.profile.active : assets.icons.bottomTab.profile.active;
              break;
            default:
              iconSource = assets.icons.bottomTab.home.active;
          }

          return (
            <Image 
              source={iconSource}
              style={{ 
                width: 24, 
                height: 24,
                tintColor: color,
                opacity: focused ? 1 : 0.5
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: colors.blue.main,
        tabBarInactiveTintColor: colors.text.primary,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
      />
      <Tab.Screen 
        name="Shop" 
        component={ShopScreen}
      />
      <Tab.Screen 
        name="Booking" 
        component={BookingScreen}
      />
      <Tab.Screen 
        name="Card" 
        component={CardScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}; 