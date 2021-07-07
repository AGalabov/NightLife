import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Subheading, Title } from 'react-native-paper';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';
import { SignUpForm } from '../components/SignUp/Form';
import { client, SignUpData } from '../services';

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
  const { setUserId } = useAuthentication();
  const { navigate } = useCustomNavigation();

  const [error, setError] = useState<string>();

  const onSignUp = async (data: SignUpData) => {
    try {
      const user = await client.signUp(data);
      setUserId(user.userId);
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
      <SignUpForm style={styles.form} onSubmit={onSignUp} />
      <Button
        mode="text"
        uppercase={false}
        style={styles.loginButton}
        onPress={() => navigate('SignIn')}>
        <Paragraph style={styles.loginText}>
          Влез в съществуващ профил
        </Paragraph>
      </Button>
    </PageWrapper>
  );
}
