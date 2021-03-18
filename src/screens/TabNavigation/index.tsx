import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { TabNavigator } from './TabNavigator';
import { HomeScreen } from '../Home';
import { SearchScreen } from '../Search';
import { ProfileScreen } from '../Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Navigator
      backBehavior="history"
      tabBar={(props: BottomTabBarProps) => <TabNavigator {...props} />}>
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  );
}
