import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Paragraph, TextInput as PaperTextInput } from 'react-native-paper';

interface TextInputProps {
  onChange: (val: string) => void;
  label: string;
  placeholder: string;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 8,
  },
  label: { color: 'white' },
});

export function TextInput({
  label,
  placeholder,
  onChange,
  style,
}: TextInputProps) {
  return (
    <View style={style}>
      <Paragraph style={styles.label}>{label}</Paragraph>
      <PaperTextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChange}
      />
    </View>
  );
}
