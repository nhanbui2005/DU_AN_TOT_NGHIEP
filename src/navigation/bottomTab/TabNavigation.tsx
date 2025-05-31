import { Animated, Image, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { assets } from '@/src/theme/assets';
import { colors } from '@/src/theme';
import { HomeScreen } from '@/src/screens/main/HomeScreen';
import { ProductSeach } from '@/src/screens/main/ProductSeach';
import { CardScreen } from '@/src/screens/main/CardScreen';
import { ProfileScreen } from '@/src/screens/main/ProfileScreen';

type RouteName = 'HomeTab' | 'SearchTab' | 'CardTab' | 'ProflieTab';
        
const TabNavigator = () => {
  const labels: Record<RouteName, string> = {
    HomeTab: 'Tin nhắn',
    SearchTab: 'Danh bạ',
    CardTab: 'Nhật ký',
    ProflieTab: 'Cá nhân',
  };

  const Tab = createBottomTabNavigator();
  const [unreadCount, setUnreadCount] = useState(3);
  const animationRef = useRef(new Animated.Value(0)).current;


  const getTabIcon = (routeName: RouteName, focused: boolean) => {
    const icons: Record<RouteName, any> = {
      HomeTab: focused ? assets.icons.bottomTab.home.active : assets.icons.bottomTab.home.active,
      SearchTab: focused ? assets.icons.bottomTab.card.active : assets.icons.bottomTab.card.inactive,
      CardTab: focused ? assets.icons.bottomTab.card.active : assets.icons.bottomTab.card.inactive,
      ProflieTab: focused ? assets.icons.bottomTab.profile.active : assets.icons.bottomTab.profile.inactive ,
    };

    return (
      <Animated.View style={focused ? { transform: [{ translateY: animationRef }] } : {}}>
        <Image
          style={[{marginTop: 20, height: 20, width: 20}]}
          source={icons[routeName]}
        />
      </Animated.View>
    );
  };

  useEffect(() => {
    if (animationRef) {
      Animated.spring(animationRef, {
        toValue: -1,
        friction: 3,
        tension: 40, 
        useNativeDriver: true,
      }).start(() => {
        animationRef.setValue(0); 
      });
    }
  }, [animationRef]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.blue.dark,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingTop: 10,
          alignItems: 'center',
        },
        tabBarShowLabel: true,
        tabBarIcon: ({ focused }) => {
          if (focused) {
            animationRef.setValue(0);
            Animated.spring(animationRef, {
              toValue: -10,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }).start();
            // Set exceptNotification based on the route
            // setExceptNotification(route.name === 'HomeTab');
          }
return getTabIcon(route.name as RouteName, focused);
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{
                fontSize: 10,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? colors.pink.main : colors.pink.main,
                textAlign: 'center',
              }}
              numberOfLines={1}
            >
              {labels[route.name as RouteName]}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="SearchTab" component={ProductSeach} />
      <Tab.Screen name="CardTab" component={CardScreen} />
      <Tab.Screen name="ProflieTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;