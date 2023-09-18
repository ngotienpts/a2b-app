import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BellIcon, CalendarIcon, HomeIcon } from 'react-native-heroicons/outline';

import HomeScreen from '../screens/HomeScreen';
import HomeBackPrimaryScreen from '../screens/HomeBackPrimaryScreen';
import HomeBackSecondaryScreen from '../screens/HomeBackSecondaryScreen';
import HomeBackTertiaryScreen from '../screens/HomeBackTertiaryScreen';
import LoginScreen from '../screens/LoginScreen';
import BookScreen from '../screens/BookScreen';
import DiaryScreen from '../screens/DiaryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import DriverScreen from '../screens/DriverScreen';
import UserScreen from '../screens/UserScreen';
import MapScreen from '../screens/MapScreen';
import PreMapScreen from '../screens/PreMapScreen';
import TokenProvider from '../redux/tokenContext';
import { NotificationProvider, useNotification } from '../redux/notificationContext';
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
import DriverFindDetailComponent from '../components/driverFindDetail';
import DriverPickScreen from '../screens/DriverPickScreen';
import DriverMovingScreen from '../screens/DriverMovingScreen';
import DriverCompleteScreen from '../screens/DriverCompleteScreen';
import LoadPointsScreen from '../screens/LoadPointsScreen';
import CancelBookClientScreen from '../screens/CancelBookClientScreen';
import CancelBookDriverScreen from '../screens/CancelBookDriverScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigation = () => {
    const { hasUnreadNotification, handleHiddenNoti } = useNotification();

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
                initialParams={handleHiddenNoti}
            />
        </Tab.Navigator>
    );
};

const AppNavigation = () => {
    return (
        <TokenProvider>
            <NotificationProvider>
                <BookingFormProvider>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Home" component={HomeStackNavigation} />
                            <Stack.Screen
                                name="HomeBackPrimary"
                                component={HomeBackPrimaryScreen}
                            />
                            <Stack.Screen
                                name="HomeBackSecondary"
                                component={HomeBackSecondaryScreen}
                            />
                            <Stack.Screen
                                name="HomeBackTertiary"
                                component={HomeBackTertiaryScreen}
                            />
                            <Stack.Screen name="Book" component={BookScreen} />
                            <Stack.Screen name="DriverScreen" component={DriverScreen} />
                            <Stack.Screen name="UserScreen" component={UserScreen} />
                            <Stack.Screen name="MapScreen" component={MapScreen} />
                            <Stack.Screen name="PreMapScreen" component={PreMapScreen} />
                            <Stack.Screen name="FindScreen" component={FindSreen} />
                            <Stack.Screen name="FindDetailScreen" component={FindDetailScreen} />
                            <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
                            <Stack.Screen name="PickScreen" component={PickScreen} />
                            <Stack.Screen name="MovingScreen" component={MovingScreen} />
                            <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
                            <Stack.Screen name="LoadPointsScreen" component={LoadPointsScreen} />
                            <Stack.Screen name="MyCarScreen" component={MyCarScreen} />
                            <Stack.Screen
                                name="VerificationScreen"
                                component={VerificationScreen}
                            />
                            <Stack.Screen name="ShareScreen" component={ShareScreen} />
                            <Stack.Screen name="DriverFindScreen" component={DriverFindScreen} />
                            <Stack.Screen
                                name="DriverFindDetailScreen"
                                component={DriverFindDetailComponent}
                            />
                            <Stack.Screen name="DriverPickScreen" component={DriverPickScreen} />
                            <Stack.Screen
                                name="DriverMovingScreen"
                                component={DriverMovingScreen}
                            />
                            <Stack.Screen
                                name="DriverCompleteScreen"
                                component={DriverCompleteScreen}
                            />
                            <Stack.Screen
                                name="CancelBookClientScreen"
                                component={CancelBookClientScreen}
                            />
                            <Stack.Screen
                                name="CancelBookDriverScreen"
                                component={CancelBookDriverScreen}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </BookingFormProvider>
            </NotificationProvider>
        </TokenProvider>
    );
};

export default AppNavigation;
