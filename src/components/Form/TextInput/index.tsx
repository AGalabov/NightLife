import React from 'react';
import {
  StyleSheet,
  View,
  TextInputProps as NativeTextInputProps,
  ViewStyle,
} from 'react-native';
import {
  Caption,
  Paragraph,
  TextInput as PaperTextInput,
} from 'react-native-paper';

type TextInputProps = Omit<
  NativeTextInputProps,
  'selectionColor' | 'onChange'
> & {
  onChange: (val: string) => void;
  label: string;
  error?: string;
  boxStyle?: ViewStyle;
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    borderRadius: 8,
  },
  height: {
    height: 50,
  },
  label: { color: 'white' },
  error: { color: 'red' },
  errorContainer: { borderColor: 'red', borderWidth: 1 },
});

export function TextInput({
  label,
  error,
  placeholder,
  onChange,
  boxStyle,
  multiline,
  ...rest
}: TextInputProps) {
  return (
    <View style={boxStyle}>
      <Paragraph style={styles.label}>{label}</Paragraph>
      <PaperTextInput
        placeholder={placeholder}
        style={[
          styles.input,
          !multiline ? styles.height : undefined,
          error ? styles.errorContainer : undefined,
        ]}
        onChangeText={onChange}
        multiline={multiline}
        {...rest}
      />
      {error && <Caption style={styles.error}>{error}</Caption>}
    </View>
  );
}
