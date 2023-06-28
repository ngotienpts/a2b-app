import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BellIcon, CalendarIcon, HomeIcon } from 'react-native-heroicons/outline';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BookScreen from '../screens/BookScreen';
import DiaryScreen from '../screens/DiaryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import DriverScreen from '../screens/DriverScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigation = () => {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#161E28',
          borderTopColor: '#161E28',
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        options={{
          tabBarLabel: 'Nhật ký',
          tabBarIcon: ({ color, size }) => <CalendarIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => <BellIcon color={color} size={size} />,
          tabBarBadge: hasUnreadNotification ? 1 : null,
          tabBarBadgeStyle: { fontSize: 10 },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeStackNavigation} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="DriverScreen" component={DriverScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
