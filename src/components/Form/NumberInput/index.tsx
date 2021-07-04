import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { black } from '../../../assets/colors';

interface NumberInputProps {
  label: string;
  initialValue?: number;
  style?: ViewStyle;
  onValueChange: (num: number) => void;
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  value: {
    minWidth: 50,
    minHeight: 50,
    marginHorizontal: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 8,
  },
  valueText: {
    color: black,
    textAlign: 'center',
  },
  label: { color: 'white' },
});

export function NumberInput({
  label,
  initialValue = 0,
  style,
  onValueChange,
}: NumberInputProps) {
  const [value, setValue] = useState(initialValue);
  return (
    <View style={[styles.root, style]}>
      <Paragraph style={styles.label}>{label}</Paragraph>
      <View style={styles.input}>
        <Button
          icon="minus"
          compact
          mode="contained"
          style={styles.button}
          onPress={() => {
            const newValue = value > 0 ? value - 1 : 0;
            setValue(newValue);
            onValueChange(newValue);
          }}>
          <></>
        </Button>
        <View style={styles.value}>
          <Paragraph style={styles.valueText}>{value}</Paragraph>
        </View>
        <Button
          onPress={() => {
            const newValue = value + 1;
            setValue(newValue);
            onValueChange(newValue);
          }}
          icon="plus"
          compact
          style={styles.button}
          mode="contained">
          <></>
        </Button>
      </View>
    </View>
  );
}
