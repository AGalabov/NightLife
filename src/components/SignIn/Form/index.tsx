import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from '../../Form/TextInput';

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
  button: {
    height: 50,
    marginTop: 16,
    justifyContent: 'center',
  },
});

type SignInFormValues = {
  email: string;
  password: string;
};

interface SignInFormProps {
  onSubmit: (data: SignInFormValues) => Promise<void>;
  style?: ViewStyle;
}

export function SignInForm({ onSubmit, style }: SignInFormProps) {
  const { register, handleSubmit, setValue } = useForm<SignInFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  return (
    <View style={style}>
      <TextInput
        label="Email Address"
        placeholder="Enter Email Address"
        onChange={(value) => setValue('email', value)}
      />
      <TextInput
        label="Password"
        placeholder="Enter Password"
        style={styles.input}
        onChange={(value) => setValue('password', value)}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        Sign In
      </Button>
    </View>
  );
}
