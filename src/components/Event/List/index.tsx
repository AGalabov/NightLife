import React from 'react';
import { View } from 'react-native';
import { Event } from '../../../models';
import { EventCard } from '../Card';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <View>
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </View>
  );
}
