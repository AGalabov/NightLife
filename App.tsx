import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './src/screens/TabNavigation';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;
