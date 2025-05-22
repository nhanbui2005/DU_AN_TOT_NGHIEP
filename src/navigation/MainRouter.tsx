import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from './types';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ShopScreen } from '../screens/main/ShopScreen';
import { BookingScreen } from '../screens/main/BookingScreen';
import { CardScreen } from '../screens/main/CardScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { Image, View } from 'react-native';
import { colors } from '../theme/colors';
import { assets } from '../theme/assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Tab = createBottomTabNavigator<MainStackParamList>();

const TabBarIcon = ({ focused, color, route }: { focused: boolean; color: string; route: string }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.3, {
        damping: 8,
        stiffness: 100,
        mass: 0.5,
      });
      translateY.value = withSpring(-6, {
        damping: 8,
        stiffness: 100,
        mass: 0.5,
      });
    } else {
      scale.value = withSpring(1, {
        damping: 8,
        stiffness: 100,
        mass: 0.5,
      });
      translateY.value = withSpring(0, {
        damping: 8,
        stiffness: 100,
        mass: 0.5,
      });
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  let iconSource;
  switch (route) {
    case 'Home':
      iconSource = focused ? assets.icons.bottomTab.home.inactive : assets.icons.bottomTab.home.inactive;
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
      iconSource = focused ? assets.icons.bottomTab.profile.active : assets.icons.bottomTab.profile.inactive;
      break;
    default:
      iconSource = assets.icons.bottomTab.home.inactive;
  }

  return (
    <Animated.View style={[{ alignItems: 'center' }, animatedStyle]}>
      <Image 
        source={iconSource}
        style={{ 
          width: 24, 
          height: 24,
          tintColor: color,
        }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export const MainRouter = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} color={color} route={route.name} />
        ),
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