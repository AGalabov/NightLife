import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { RootNavigation } from './src/screens/Navigation';
import { UserContextProvider } from './src/context/user';
import { black } from './src/assets/colors';

type Theme = typeof DefaultTheme;

const theme: Theme = {
  ...DefaultTheme,
  dark: true,

  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6979F8',
    text: 'white',
    background: black,
    accent: '#6979F8',
    placeholder: '#8C8C8C',
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
