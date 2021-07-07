import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  VenueTabNavigation,
  GuestTabNavigation,
  UserTabNavigation,
} from './TabNavigation';
import { EventDetailsScreen } from '../EventDetails';
import { useAuthentication } from '../../hooks/use-authentication';
import { SignInScreen } from '../SignIn';
import { SignUpScreen } from '../SignUp';

const { Navigator, Screen } = createStackNavigator();

function getComponent(isGuest: boolean, isAdmin: boolean) {
  if (isGuest) {
    return GuestTabNavigation;
  }
  if (!isAdmin) {
    return UserTabNavigation;
  }
  return VenueTabNavigation;
}

export function RootNavigation() {
  const { isVenue, isGuest } = useAuthentication();

  const TabNavigatorComponent = getComponent(isGuest, isVenue);

  // TODO: Make sure logout clears history properly
  return (
    <Navigator headerMode="none">
      <Screen name="TabNavigator" component={TabNavigatorComponent} />
      <Screen name="EventDetails" component={EventDetailsScreen} />
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  );
}
