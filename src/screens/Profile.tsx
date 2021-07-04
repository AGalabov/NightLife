import React from 'react';
import { ProfileContent } from '../components/Profile';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';

export function ProfileScreen() {
  const { profile } = useAuthentication();

  return (
    <PageWrapper scrollable={false}>
      {profile && <ProfileContent profile={profile} />}
    </PageWrapper>
  );
}
