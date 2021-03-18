import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface Props {
  active: boolean;
  label: string;
  // ActiveIcon: SvgType;
  // InactiveIcon: SvgType;
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
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      {active ? ActiveIcon : InactiveIcon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
