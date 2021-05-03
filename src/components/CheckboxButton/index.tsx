import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface CheckboxButtonProps {
  onPress: (newChoice: boolean) => void;
  initiallyChecked?: boolean;
  label: string;
  style?: ViewStyle;
}

export const CheckboxButton = ({
  onPress,
  initiallyChecked = false,
  label,
  style,
}: CheckboxButtonProps) => {
  const [checked, setChecked] = React.useState(initiallyChecked);

  return (
    <Button
      mode={checked ? 'contained' : 'outlined'}
      onPress={() => {
        onPress(!checked);
        setChecked(!checked);
      }}
      dark={checked}
      color={checked ? undefined : 'white'}
      style={style}>
      {label}
    </Button>
  );
};
