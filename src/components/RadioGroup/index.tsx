import * as React from 'react';
import { RadioButton } from 'react-native-paper';

interface RadioGroupProps<T extends any> {
  selectedValue: T;
  onClick: (value: T) => void;
  options: { label: string; value: T }[];
}

export function RadioGroup<Value extends any>({
  selectedValue,
  onClick,
  options,
}: RadioGroupProps<Value>) {
  return (
    <>
      {options.map((option) => (
        <RadioButton.Item
          key={option.label}
          label={option.label}
          onPress={() => onClick(option.value)}
          value=""
          status={option.value === selectedValue ? 'checked' : 'unchecked'}
        />
      ))}
    </>
  );
}
