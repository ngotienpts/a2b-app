import React, { useState } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BellIcon, CalendarIcon, HomeIcon } from 'react-native-heroicons/outline';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BookScreen from '../screens/BookScreen';
import WifiScreen from '../screens/WifiScreen';
import DiaryScreen from '../screens/DiaryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import DriverScreen from '../screens/DriverScreen';
import UserScreen from '../screens/UserScreen';
import MapScreen from '../screens/MapScreen';
import PreMapScreen from '../screens/PreMapScreen';
import TokenProvider from '../redux/tokenContext';
import FindSreen from '../screens/FindSreen';
import FindDetailScreen from '../screens/FindDetailScreen';
import BookingFormProvider from '../redux/bookingFormContext';
import ConfirmScreen from '../screens/ConfirmScreen';
import PickScreen from '../screens/PickScreen';
import MovingScreen from '../screens/MovingScreen';
import CompleteScreen from '../screens/CompleteScreen';
import MyCarScreen from '../screens/MyCarScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ShareScreen from '../screens/ShareScreen';
import DriverFindScreen from '../screens/DriverFindScreen';
import DriverFindDetailComponent from '../components/driverFindDetail/DriverFindDetailComponent';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigation = () => {
  const {params} = useRoute();
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
        params = {params}
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
}
const AppNavigation = () => {
    return (
        <TokenProvider>
            <BookingFormProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="UserScreen" component={UserScreen} />
                        <Stack.Screen name="WifiScreen" component={WifiScreen} />
                        <Stack.Screen name="MyCarScreen" component={MyCarScreen} />
                        <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Home" component={HomeStackNavigation} />
                        <Stack.Screen name="DriverScreen" component={DriverScreen} />
                        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                        <Stack.Screen name="Book" component={BookScreen} />
                        <Stack.Screen name="MapScreen" component={MapScreen} />
                        <Stack.Screen name="PreMapScreen" component={PreMapScreen} />
                        <Stack.Screen name="FindScreen" component={FindSreen} />
                        <Stack.Screen name="FindDetailScreen" component={FindDetailScreen} />
                        <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
                        <Stack.Screen name="PickScreen" component={PickScreen} />
                        <Stack.Screen name="MovingScreen" component={MovingScreen} />
                        <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
                        <Stack.Screen name="ShareScreen" component={ShareScreen} />
                        <Stack.Screen name="DriverFindScreen" component={DriverFindScreen} />
                        <Stack.Screen
                            name="DriverFindDetailScreen"
                            component={DriverFindDetailComponent}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </BookingFormProvider>
        </TokenProvider>
    );
};

export default AppNavigation;