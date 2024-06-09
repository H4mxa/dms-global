import React from 'react';
import {HomeScreen} from '@screens/authentication/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchScreen} from '@screens/authentication/Search';
import {NotificationsScreen} from '@screens/authentication/Notification';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home1"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
