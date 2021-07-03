import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Subheading, Title } from 'react-native-paper';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';
import { SignUpForm } from '../components/SignUp/Form';
import { Profile } from '../models';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    lineHeight: 40,
    fontSize: 32,
    textAlign: 'center',
  },
  subheading: { marginTop: 8, textAlign: 'center' },
  loginText: { textAlign: 'center' },
  loginButton: { marginTop: 32 },
  error: { color: 'red', lineHeight: 28, fontSize: 20 },
  form: { marginTop: 16 },
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
        userId: '1234',
      };

      // TODO: Switch to actual request for sign up
      login(profile);
      navigate('Profile');
    } catch (err) {
      setError('Oops something went wrong');
    }
  };

  return (
    <PageWrapper scrollable={false} header="back-navigation">
      <Title style={styles.title}>Регистрация</Title>

      <Subheading style={styles.subheading}>
        Създай собствен акаунт, за да достъпиш цялата фунцкионалност на
        приложението
      </Subheading>

      {error && <Paragraph style={styles.error}>{error}</Paragraph>}
      <SignUpForm
        style={styles.form}
        onSubmit={(data) => onSignUp(data.email, data.password, data.fullName)}
      />
      <Button
        mode="text"
        style={styles.loginButton}
        onPress={() => navigate('SignIn')}>
        <Paragraph style={styles.loginText}>
          Влез в съществуващ профил
        </Paragraph>
      </Button>
    </PageWrapper>
  );
}
