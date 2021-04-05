import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import {
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from '../../../utils/validators';
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
};

interface SignInFormProps {
  onSubmit: (data: SignUpFormValues) => Promise<void>;
  style?: ViewStyle;
}

export function SignUpForm({ onSubmit, style }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
  } = useForm<SignUpFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    register('email', {
      required: 'Email is required',
      validate: isValidEmail,
    });
    register('password', {
      required: 'Password is required',
      validate: isValidPassword,
    });

    register('fullName', {
      required: 'First and Last names are required',
      validate: isValidFullName,
    });
  }, [register]);

  return (
    <View style={style}>
      <TextInput
        label="Full Name"
        placeholder="Enter First and Last Name"
        error={errors.fullName?.message}
        onChange={(value) => setValue('fullName', value)}
      />
      <TextInput
        label="Email Address"
        placeholder="Enter Email Address"
        boxStyle={styles.input}
        error={errors.email?.message}
        onChange={(value) => setValue('email', value)}
      />
      <TextInput
        label="Password"
        placeholder="Enter Password"
        boxStyle={styles.input}
        error={errors.password?.message}
        secureTextEntry
        onChange={(value) => setValue('password', value)}
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
