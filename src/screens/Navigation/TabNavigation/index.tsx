import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { TabNavigator } from './TabNavigator';
import { HomeScreen } from '../../Home';
import { SearchScreen } from '../../Search';
import { ProfileScreen } from '../../Profile';
import { AddEventScreen } from '../../AddEvent';
import { EventDetailsScreen } from '../../EventDetails';

const User = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <User.Navigator
      backBehavior="history"
      tabBar={(props: BottomTabBarProps) => <TabNavigator {...props} />}>
      <User.Screen name="Search" component={SearchScreen} />
      <User.Screen name="Home" component={HomeScreen} />
      <User.Screen name="Profile" component={ProfileScreen} />
    </User.Navigator>
  );
}

const { Navigator, Screen } = createBottomTabNavigator();

export function AdminTabNavigation() {
  return (
    <Navigator
      backBehavior="history"
      tabBar={(props: BottomTabBarProps) => <TabNavigator {...props} />}>
      <Screen name="Search" component={SearchScreen} />
      <Screen name="AddEvent" component={AddEventScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  );
}
