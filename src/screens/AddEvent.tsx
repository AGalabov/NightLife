import React from 'react';
import { StyleSheet } from 'react-native';
import { EventForm } from '../components/Event/Form';
import { useAuthentication } from '../hooks/use-authentication';
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

  function onSubmit(data: AddEventFormValues) {
    // This will always be true
    if (userId && profile?.type === 'venue') {
      return client.addEvent({
        ...data,
        venueId: userId,
        venueLogoUri: profile.venue.logoUri,
      });
    }
    return Promise.resolve();
  }

  return (
    <PageWrapper scrollable style={styles.root}>
      <EventForm onSubmit={onSubmit} />
    </PageWrapper>
  );
}
