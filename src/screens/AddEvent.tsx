import React from 'react';
import { StyleSheet } from 'react-native';
import { EventForm } from '../components/Event/Form';
import { useAsyncAction } from '../hooks/use-async-action';
import { useAuthentication } from '../hooks/use-authentication';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
import { AddEventFormValues, client } from '../services';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  root: {
    // TODO: Why do we need this?
    marginBottom: 85,
  },
});

export function AddEventScreen() {
  const { userId, profile } = useAuthentication();
  const { navigate } = useCustomNavigation();

  const { perform: onSubmit } = useAsyncAction(
    async (data: AddEventFormValues) => {
      // This will always be true
      if (userId && profile?.type === 'venue') {
        const { eventId } = await client.addEvent({
          ...data,
          venueId: userId,
          venueLogoUri: profile.venue.logoUri,
        });
        navigate('EventDetails', { eventId });
      }
      return Promise.resolve();
    },
    [navigate, profile, userId],
  );

  return (
    <PageWrapper scrollable style={styles.root}>
      <EventForm onSubmit={onSubmit} />
    </PageWrapper>
  );
}
