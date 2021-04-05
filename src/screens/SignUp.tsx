import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';
import { SignUpForm } from '../components/SignUp/Form';
import { Profile } from '../models';

const styles = StyleSheet.create({
  wrapper: { marginTop: 40 },
  title: {
    color: 'white',
    lineHeight: 40,
    fontSize: 32,
    textAlign: 'center',
  },
  error: { color: 'red', lineHeight: 28, fontSize: 20 },
  form: { marginTop: 40 },
});

export function SignUpScreen() {
  const { login } = useAuthentication();
  const { navigate } = useCustomNavigation();

  const [error, setError] = useState<string>();

  const onSignUp = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    try {
      const profile: Profile = {
        email,
        firstName: fullName.trim().split(' ')[0]!,
        lastName: fullName.trim().split(' ')[1]!,
        favoriteArtists: [],
        favoriteVenues: [],
        visitedEvents: [],
        type: 'regular',
        userId: 1234,
      };

      // TODO: Switch to actual request for sign up
      login(profile);
      navigate('Profile');
    } catch (err) {
      setError('Oops something went wrong');
    }
  };

  return (
    <PageWrapper scrollable={false} withBackButton>
      <View style={styles.wrapper}>
        <Title style={styles.title}>Sign Up</Title>

        {error && <Paragraph style={styles.error}>{error}</Paragraph>}
        <SignUpForm
          style={styles.form}
          onSubmit={(data) =>
            onSignUp(data.email, data.password, data.fullName)
          }
        />
      </View>
    </PageWrapper>
  );
}
