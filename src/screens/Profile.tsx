import React from 'react';
import { Button, Paragraph } from 'react-native-paper';
import { ProfileContent } from '../components/Profile';
import { useUser } from '../hooks/use-user';
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

export function ProfileScreen() {
  const { login, logout, user, isGuest } = useUser();

  return (
    <PageWrapper>
      <ProfileContent />
      <Paragraph>Profile! - {user?.type}</Paragraph>
      {isGuest ? (
        <>
          <Button mode="contained" onPress={() => login(testAdmin)}>
            <Paragraph>Log as Admin</Paragraph>
          </Button>

          <Button
            mode="contained"
            style={{ marginTop: 8 }}
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
