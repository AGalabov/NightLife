import React from 'react';
import { StyleSheet } from 'react-native';
import { EventForm } from '../components/Event/Form';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  root: {
    // TODO: Why do we need this?
    marginBottom: 85,
  },
});

export function AddEventScreen() {
  return (
    <PageWrapper scrollable style={styles.root}>
      <EventForm
        onSubmit={() => {
          return Promise.resolve();
        }}
      />
    </PageWrapper>
  );
}
