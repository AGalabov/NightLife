import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { RootNavigation } from './src/screens/Navigation';
import { UserContextProvider } from './src/context/user';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <UserContextProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PaperProvider>
      </UserContextProvider>
    </>
  );
};

export default App;
