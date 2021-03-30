import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminTabNavigation, UserTabNavigation } from './TabNavigation';
import { EventDetailsScreen } from '../EventDetails';
import { useAuthentication } from '../../hooks/use-user';
import { SignInScreen } from '../SignIn';

const { Navigator, Screen } = createStackNavigator();

export function RootNavigation() {
  const { isAdmin } = useAuthentication();

  // TODO: Make sure logout clears history properly
  return (
    <Navigator headerMode="none">
      <Screen
        name="TabNavigator"
        component={isAdmin ? AdminTabNavigation : UserTabNavigation}
      />
      <Screen name="EventDetails" component={EventDetailsScreen} />
      <Screen name="SignIn" component={SignInScreen} />
    </Navigator>
  );
}
