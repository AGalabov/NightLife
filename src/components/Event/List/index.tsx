import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Event } from '../../../models';
import { EventCard } from '../Card';

interface EventListProps {
  events: Event[];
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  margin: {
    marginBottom: 16,
  },
});

export function EventList({ events, style }: EventListProps) {
  return (
    <View style={style}>
      {events.map((event) => (
        <View key={event.eventId} style={styles.margin}>
          <EventCard event={event} />
        </View>
      ))}
    </View>
  );
}
