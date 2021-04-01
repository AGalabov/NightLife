import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { isValidEmail, isValidPassword } from '../../../utils/validators';
import { TextInput } from '../../Form/TextInput';

const styles = StyleSheet.create({
  input: {
    // marginTop: 6,
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
  const {
    register,
    handleSubmit,
    setValue,
    errors,
  } = useForm<SignInFormValues>({
    mode: 'onSubmit',
    defaultValues: {
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
  }, [register]);

  return (
    <View style={style}>
      <TextInput
        label="Email Address"
        placeholder="Enter Email Address"
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
        Sign In
      </Button>
    </View>
  );
}
