import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminTabNavigation, UserTabNavigation } from './TabNavigation';
import { EventDetailsScreen } from '../EventDetails';
import { useAuthentication } from '../../hooks/use-authentication';
import { SignInScreen } from '../SignIn';
import { SignUpScreen } from '../SignUp';

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
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  );
}
