import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/screens/Navigation';
import { UserContextProvider } from './src/context/user';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <UserContextProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </UserContextProvider>
    </>
  );
};

export default App;
