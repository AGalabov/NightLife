import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Event } from '../../../models';
import { EventCard } from '../Card';

interface EventListProps {
  events: Event[];
}

const styles = StyleSheet.create({
  margin: {
    marginBottom: 16,
  },
});

export function EventList({ events }: EventListProps) {
  return (
    <View>
      {events.map((event) => (
        <View key={event.eventId} style={styles.margin}>
          <EventCard event={event} />
        </View>
      ))}
    </View>
  );
}
