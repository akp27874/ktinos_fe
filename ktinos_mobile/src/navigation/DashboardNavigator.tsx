import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { theme } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import GpsTrackingScreen from '../screens/GpsTrackingScreen';
import HealthMonitoringScreen from '../screens/HealthMonitoringScreen';
import UserListScreen from '../screens/UserListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) => (
  <View style={{ alignItems: 'center', gap: 2 }}>
    <Text style={{ fontSize: 20 }}>{emoji}</Text>
    <Text
      style={{
        fontSize: 10,
        fontWeight: focused ? '700' : '400',
        color: focused ? theme.colors.primary.deepPurple : theme.colors.neutral.gray[400],
      }}
    >
      {label}
    </Text>
  </View>
);

export default function DashboardNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.neutral.white,
          borderTopWidth: 1,
          borderTopColor: theme.colors.neutral.gray[200],
          height: 72,
          paddingBottom: 8,
          paddingTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🐾" label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="GPS"
        component={GpsTrackingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📍" label="GPS" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Health"
        component={HealthMonitoringScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💊" label="Health" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Pets"
        component={UserListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🐶" label="Pets" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙️" label="Settings" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
