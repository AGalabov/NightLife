import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';
import { SignInForm } from '../components/SignIn/Form';
import { client } from '../client';

const styles = StyleSheet.create({
  wrapper: { marginTop: 60 },
  title: {
    color: 'white',
    lineHeight: 40,
    fontSize: 32,
    textAlign: 'center',
  },
  error: { color: 'red', lineHeight: 28, fontSize: 20 },
  form: { marginTop: 40 },
});

export function SignInScreen() {
  const { login } = useAuthentication();
  const { navigate } = useCustomNavigation();

  const [error, setError] = useState<string>();

  const onLogin = async (email: string, password: string) => {
    try {
      const user = await client.login(email, password);
      login(user);
      navigate('Profile');
    } catch (err) {
      setError('Oops something went wrong');
    }
  };

  return (
    <PageWrapper scrollable={false} withBackButton>
      <View style={styles.wrapper}>
        <Title style={styles.title}>Sign In</Title>

        {error && <Paragraph style={styles.error}>{error}</Paragraph>}
        <SignInForm
          style={styles.form}
          onSubmit={(data) => onLogin(data.email, data.password)}
        />
      </View>
    </PageWrapper>
  );
}
