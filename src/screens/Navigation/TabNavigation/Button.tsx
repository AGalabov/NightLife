import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export interface TabNavigationButtonProps {
  active: boolean;
  label: string;
  ActiveIcon: React.ReactNode;
  InactiveIcon: React.ReactNode;
  onPress(): void;
}

export function TabNavigationButton({
  active = false,
  label,
  ActiveIcon,
  InactiveIcon,
  onPress,
}: TabNavigationButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      {active ? ActiveIcon : InactiveIcon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
