import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import { EventDetails } from '../components/Event/Details';
import { client } from '../services';
import { Event, Venue } from '../models';
import { backgroundGray } from '../assets/colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: backgroundGray,
  },
});

export function EventDetailsScreen() {
  const { params } = useRoute();
  const { eventId } = params as { eventId: string };
  const [event, setEvent] = useState<Event>();
  const [eventVenue, setEventVenue] = useState<Venue>();

  useEffect(() => {
    const asyncAction = async () => {
      const fetchedEvent = await client.getEventById(eventId);
      setEvent(fetchedEvent);
      if (!fetchedEvent) {
        return;
      }

      const [venue] = await Promise.all([
        client.getVenueById(fetchedEvent.venueId),
      ]);
      setEventVenue(venue);
    };
    asyncAction();
  }, [eventId]);

  return (
    <ScrollView style={styles.root}>
      {event && eventVenue && <EventDetails event={event} venue={eventVenue} />}
    </ScrollView>
  );
}
