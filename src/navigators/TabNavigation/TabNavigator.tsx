import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TabNavigationButton} from './Button';
import {useNavigation} from '@react-navigation/core';

const {Navigator, Screen} = createBottomTabNavigator();

type Routes = 'Search' | 'Home' | 'Profile';

function useCustomNavigation() {
  const {navigate, ...rest} = useNavigation();

  const customNavigate = (newTab: Routes) => {
    navigate(newTab);
  };

  return {navigate: customNavigate, ...rest};
}

function HomeScreen() {
  const {goBack} = useCustomNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <Text>Home!</Text>
      <Button title="Go back" onPress={() => goBack()} />
    </View>
  );
}

function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
      }}>
      <Text>Home!</Text>
    </View>
  );
}

function ProfileScreen() {
  const {navigate} = useCustomNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}>
      <Text>Profile!</Text>
      <Button title="Go to Home" onPress={() => navigate('Home')} />
    </View>
  );
}

export function TabNavigator() {
  return (
    <Navigator
      backBehavior="history"
      tabBar={(props: BottomTabBarProps) => <TabNavigation {...props} />}>
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  );
}

interface VisualTabOptions {
  render: (key: string, active: boolean, onPress: () => void) => void;
}

// This is the visual part of the tab navigator options.
const tabOptions: Record<Routes, VisualTabOptions> = {
  Search: {
    render: (key, active, onPress) => (
      <TabNavigationButton
        key={key}
        label="Search"
        active={active}
        ActiveIcon={
          <View style={{backgroundColor: 'blue', width: 20, height: 20}} />
        }
        InactiveIcon={
          <View style={{backgroundColor: 'blue', width: 20, height: 20}} />
        }
        onPress={onPress}
      />
    ),
  },

  Home: {
    render: (key, active, onPress) => (
      <TabNavigationButton
        key={key}
        label="Home"
        active={active}
        ActiveIcon={
          <View style={{backgroundColor: 'red', width: 20, height: 20}} />
        }
        InactiveIcon={
          <View style={{backgroundColor: 'red', width: 20, height: 20}} />
        }
        onPress={onPress}
      />
    ),
  },

  Profile: {
    render: (key, active, onPress) => (
      <TabNavigationButton
        key={key}
        label="Profile"
        active={active}
        ActiveIcon={
          <View style={{backgroundColor: 'green', width: 20, height: 20}} />
        }
        InactiveIcon={
          <View style={{backgroundColor: 'green', width: 20, height: 20}} />
        }
        onPress={onPress}
      />
    ),
  },
};

export default function TabNavigation({state, navigation}: BottomTabBarProps) {
  // This is the current route at this navigation level.
  const currentRouteName = state.routes[state.index].name;

  console.log({currentRouteName});

  // const isKeyboardShown = useKeyboardShown();

  // if (isKeyboardShown) {
  //   return null;
  // }

  return (
    <View style={styles.linksContainer}>
      {state.routes.map((route: any, index: number) => {
        console.log({state: state.index, index, route: route.name});
        const isActive = state.index === index;

        const {render} = tabOptions[route.name as Routes];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return render(route.key, isActive, onPress);
      })}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   ...footerStyle,
  //   backgroundColor: pure,
  //   height: barHeight,
  //   ...Platform.select({
  //     android: {
  //       backgroundColor: 'transparent',
  //       height: overflowedBarHeight,
  //       zIndex: 1,
  //       ...absolutePositioning,
  //     },
  //   }),
  // },
  linksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 6,
    paddingHorizontal: 20,
    height: 50,
    // ...Platform.select({
    //   android: {
    //     elevation: 9,
    //     // height: overflowedBarHeight,
    //   },
    // }),
  },
});
