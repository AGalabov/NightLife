import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Text } from 'react-native-paper';

import { client } from '../client';
import { ProfileContent } from '../components/Profile';
import { useAuthentication } from '../hooks/use-user';
import { Profile } from '../models';
import { PageWrapper } from './PageWrapper';

const testAdmin = {
  email: '',
  firstName: '',
  lastName: '',
  type: 'admin',
} as const;
const testUser = {
  email: '',
  firstName: '',
  lastName: '',
  type: 'regular',
} as const;

const styles = StyleSheet.create({
  wrapper: { backgroundColor: 'white' },
  bottomButton: {
    marginTop: 8,
  },
});

export function ProfileScreen() {
  const { login, logout, isGuest } = useAuthentication();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const asyncFunc = async () => {
      const fetchedProfile = await client.getProfile(1);
      setProfile(fetchedProfile);
    };
    asyncFunc();
  }, []);

  return (
    <PageWrapper style={styles.wrapper}>
      {profile && <ProfileContent profile={profile} />}
      {isGuest ? (
        <>
          <Button mode="contained" onPress={() => login(testAdmin)}>
            <Paragraph>Log as Admin</Paragraph>
          </Button>

          <Text />

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => login(testUser)}>
            <Paragraph>Log as Regular</Paragraph>
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
