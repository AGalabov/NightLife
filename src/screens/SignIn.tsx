import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Subheading, Title } from 'react-native-paper';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { PageWrapper } from './PageWrapper';
import { SignInForm } from '../components/SignIn/Form';
import { client } from '../services';
import { useAuthentication } from '../hooks/use-authentication';

const styles = StyleSheet.create({
  wrapper: { marginTop: 60 },
  title: {
    color: 'white',
    lineHeight: 40,
    fontSize: 32,
    textAlign: 'center',
  },
  subheading: { marginTop: 8, textAlign: 'center' },
  createProfileText: { textAlign: 'center' },
  createProfileButton: { marginTop: 32 },
  error: { color: 'red', lineHeight: 28, fontSize: 20 },
  form: { marginTop: 16 },
});

export function SignInScreen() {
  const { navigate } = useCustomNavigation();
  const { setUserId } = useAuthentication();

  const [error, setError] = useState<string>();

  const onLogin = async (email: string, password: string) => {
    try {
      const user = await client.login(email, password);
      setUserId(user.userId);
    } catch (err) {
      setError('Oops something went wrong');
    }
  };

  return (
    <PageWrapper header="back-navigation" style={styles.wrapper} scrollable>
      <Title style={styles.title}>Вход</Title>
      <Subheading style={styles.subheading}>
        Влез в профилът си, за да видиш най-добрите предложения, за твоите
        интереси
      </Subheading>

      {error && <Paragraph style={styles.error}>{error}</Paragraph>}
      <SignInForm
        style={styles.form}
        onSubmit={(data) => onLogin(data.email, data.password)}
      />
      <Button
        mode="text"
        uppercase={false}
        style={styles.createProfileButton}
        onPress={() => navigate('SignUp')}>
        <Paragraph style={styles.createProfileText}>
          Създай нов профил
        </Paragraph>
      </Button>
    </PageWrapper>
  );
}
