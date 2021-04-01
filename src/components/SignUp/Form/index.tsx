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

type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignInFormProps {
  onSubmit: (data: SignUpFormValues) => Promise<void>;
  style?: ViewStyle;
}

export function SignUpForm({ onSubmit, style }: SignInFormProps) {
  const { register, handleSubmit, setValue } = useForm<SignUpFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    register('fullName');
    register('email');
    register('password');
    register('confirmPassword');
  }, [register]);

  return (
    <View style={style}>
      <TextInput
        label="Full Name"
        placeholder="Enter First and Last Name"
        onChange={(value) => setValue('fullName', value)}
      />
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
      <TextInput
        label="Confirm Password"
        placeholder="Confirm Your Password"
        style={styles.input}
        onChange={(value) => setValue('confirmPassword', value)}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
    </View>
  );
}
