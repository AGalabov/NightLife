import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigationButton } from './Button';
import { Routes } from '../../hooks/use-custom-navigation';

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
          <View style={{ backgroundColor: 'blue', width: 20, height: 20 }} />
        }
        InactiveIcon={
          <View style={{ backgroundColor: 'blue', width: 20, height: 20 }} />
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
          <View style={{ backgroundColor: 'red', width: 20, height: 20 }} />
        }
        InactiveIcon={
          <View style={{ backgroundColor: 'red', width: 20, height: 20 }} />
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
          <View style={{ backgroundColor: 'green', width: 20, height: 20 }} />
        }
        InactiveIcon={
          <View style={{ backgroundColor: 'green', width: 20, height: 20 }} />
        }
        onPress={onPress}
      />
    ),
  },
};

export function TabNavigator({ state, navigation }: BottomTabBarProps) {
  // This is the current route at this navigation level.
  const currentRouteName = state.routes[state.index].name;

  console.log({ currentRouteName });

  // const isKeyboardShown = useKeyboardShown();

  // if (isKeyboardShown) {
  //   return null;
  // }

  return (
    <View style={styles.linksContainer}>
      {state.routes.map((route: any, index: number) => {
        console.log({ state: state.index, index, route: route.name });
        const isActive = state.index === index;

        const { render } = tabOptions[route.name as Routes];

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
    </View>
  );
}

const styles = StyleSheet.create({
  linksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 6,
    paddingHorizontal: 20,
    height: 50,
  },
});
