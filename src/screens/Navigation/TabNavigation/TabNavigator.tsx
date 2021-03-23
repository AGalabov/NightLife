import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabRoutes } from '../../../hooks/use-custom-navigation';
import { TabNavigationButton } from './Button';

interface VisualTabOptions {
  render: (key: string, active: boolean, onPress: () => void) => void;
}

const tabOptions: Record<TabRoutes, VisualTabOptions> = {
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

  AddEvent: {
    render: (key, active, onPress) => (
      <TabNavigationButton
        key={key}
        label="AddEvent"
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

export function TabNavigator({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.linksContainer}>
      {state.routes.map((route: any, index: number) => {
        const isActive = state.index === index;

        const routeName: TabRoutes = route.name;
        const { render } = tabOptions[routeName];

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
