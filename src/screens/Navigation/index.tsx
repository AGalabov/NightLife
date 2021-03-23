import React from 'react';
import { AdminTabNavigation, TabNavigation } from './TabNavigation';
import { EventDetailsScreen } from '../EventDetails';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export function RootNavigation() {
  // TODO: Make sure logout clears history properly
  return (
    <Navigator headerMode="none">
      <Screen
        name="TabNavigator"
        component={false ? TabNavigation : AdminTabNavigation}
      />
      <Screen name="EventDetails" component={EventDetailsScreen} />
    </Navigator>
  );
}
