import React from 'react';
import { StyleSheet } from 'react-native';
import { dark } from '../assets/colors';
import { ProfileContent } from '../components/Profile';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: dark,
  },
});

export function ProfileScreen() {
  const { profile } = useAuthentication();

  return (
    <PageWrapper style={styles.wrapper} scrollable={false}>
      {profile && <ProfileContent profile={profile} />}
    </PageWrapper>
  );
}
