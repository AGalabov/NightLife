import React, { useState } from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';

interface CheckboxProps {
  onPress: (newChoice: boolean) => void;
  initiallyChecked?: boolean;
  label: string;
}

export const Checkbox = ({
  onPress,
  initiallyChecked = false,
  label,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(initiallyChecked);

  return (
    <PaperCheckbox.Item
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        onPress(!checked);
        setChecked(!checked);
      }}
      label={label}
    />
  );
};
