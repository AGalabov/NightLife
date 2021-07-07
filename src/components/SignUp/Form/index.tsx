import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { ProfileType } from '../../../models';
import { SignUpData } from '../../../services';
import {
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from '../../../utils/validators';
import { Checkbox } from '../../Checkbox';
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

interface SignUpFormProps {
  onSubmit: (data: SignUpData) => Promise<void>;
  style?: ViewStyle;
}

export function SignUpForm({ onSubmit, style }: SignUpFormProps) {
  const [profileType, setProfileType] = useState<ProfileType>('regular');

  const { register, handleSubmit, setValue, errors } = useForm<SignUpData>({
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      type: profileType,
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

      <Checkbox
        onPress={(newChoice) => setProfileType(newChoice ? 'venue' : 'regular')}
        label="Създай профил за за заведение"
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit((data) =>
          onSubmit({ ...data, type: profileType }),
        )}>
        Sign Up
      </Button>
    </View>
  );
}
