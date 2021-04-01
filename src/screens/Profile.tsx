import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';

import { ProfileContent } from '../components/Profile';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  wrapper: { backgroundColor: 'white' },
  bottomButton: {
    marginTop: 8,
  },
});

export function ProfileScreen() {
  const { logout, isGuest, profile } = useAuthentication();
  const { navigate } = useCustomNavigation();

  return (
    <PageWrapper style={styles.wrapper} scrollable={false}>
      {profile && <ProfileContent profile={profile} />}
      {isGuest ? (
        <>
          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => navigate('SignIn')}>
            <Paragraph>Sign In</Paragraph>
          </Button>
          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {}}>
            <Paragraph>Sign Up</Paragraph>
          </Button>
        </>
      ) : (
        <Button mode="contained" onPress={logout}>
          <Paragraph>Logout</Paragraph>
        </Button>
      )}
    </PageWrapper>
  );
}
