import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminTabNavigation, TabNavigation } from './TabNavigation';
import { EventDetailsScreen } from '../EventDetails';
import { useUser } from '../../hooks/use-user';

const { Navigator, Screen } = createStackNavigator();

export function RootNavigation() {
  const { isAdmin } = useUser();

  // TODO: Make sure logout clears history properly
  return (
    <Navigator headerMode="none">
      <Screen
        name="TabNavigator"
        component={isAdmin ? AdminTabNavigation : TabNavigation}
      />
      <Screen name="EventDetails" component={EventDetailsScreen} />
    </Navigator>
  );
}
