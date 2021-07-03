import { useRoute } from '@react-navigation/core';
import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import { EventDetails } from '../components/Event/Details';
import { client } from '../services';
import { Event, Venue } from '../models';
import { backgroundGray } from '../assets/colors';
import { useAsync } from '../hooks/use-async';

const styles = StyleSheet.create({
  root: {
    backgroundColor: backgroundGray,
  },
});

export function EventDetailsScreen() {
  const { params } = useRoute();
  const { eventId } = params as { eventId: string };

  const { data } = useAsync<{ event?: Event; venue?: Venue }>(async () => {
    const fetchedEvent = await client.getEventById(eventId);

    if (!fetchedEvent) {
      return { event: undefined, venue: undefined };
    }

    const fetchedVenue = await client.getVenueById(fetchedEvent.venueId);

    return {
      event: fetchedEvent,
      venue: fetchedVenue,
    };
  }, [eventId]);

  return (
    <ScrollView style={styles.root}>
      {data?.event && data?.venue && (
        <EventDetails event={data.event} venue={data.venue} />
      )}
    </ScrollView>
  );
}
