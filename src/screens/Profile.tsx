import React from 'react';
import { ProfileContent } from '../components/Profile';
import { VenuePage } from '../components/Venue/Page';
import { useAuthentication } from '../hooks/use-authentication';
import { PageWrapper } from './PageWrapper';

export function ProfileScreen() {
  const { profile } = useAuthentication();

  return (
    <PageWrapper scrollable={false}>
      {profile?.type === 'regular' && (
        <ProfileContent profile={profile.profile} />
      )}
      {profile?.type === 'venue' && <VenuePage venue={profile.venue} />}
    </PageWrapper>
  );
}
