import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SearchScreen } from '../../Search';
import { ProfileScreen } from '../../Profile';
import { AddEventScreen } from '../../AddEvent';
import { HomeScreen } from '../../Home';
import { activeBlue, black } from '../../../assets/colors';
import { SignInScreen } from '../../SignIn';

const Guest = createMaterialBottomTabNavigator();

export function GuestTabNavigation() {
  return (
    <Guest.Navigator
      initialRouteName="Home"
      inactiveColor="white"
      activeColor={activeBlue}
      barStyle={{ backgroundColor: black }}
      shifting
      sceneAnimationEnabled={false}>
      <Guest.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: 'magnify',
        }}
      />
      <Guest.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <Guest.Screen
        name="Profile"
        component={SignInScreen}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </Guest.Navigator>
  );
}

const User = createMaterialBottomTabNavigator();

export function UserTabNavigation() {
  return (
    <User.Navigator
      initialRouteName="Home"
      inactiveColor="white"
      activeColor={activeBlue}
      barStyle={{ backgroundColor: black }}
      shifting
      sceneAnimationEnabled={false}>
      <User.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: 'magnify',
        }}
      />
      <User.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <User.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </User.Navigator>
  );
}

const Admin = createMaterialBottomTabNavigator();

export const AdminTabNavigation = () => {
  return (
    <Admin.Navigator
      initialRouteName="Profile"
      shifting
      inactiveColor="white"
      activeColor={activeBlue}
      barStyle={{ backgroundColor: black }}
      sceneAnimationEnabled={false}>
      <Admin.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: 'magnify',
        }}
      />
      <Admin.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          tabBarIcon: 'plus-box',
        }}
      />
      <Admin.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </Admin.Navigator>
  );
};
