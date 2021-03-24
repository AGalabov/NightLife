import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Event } from '../../../models';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <Card.Cover
        source={{
          uri:
            'https://zavedenia.com/zimages/sofia/big/2353/23533d3098b5a4755e2e0dde5205c623f936.jpg',
        }}
      />
      <Text>{event.title}</Text>
    </Card>
  );
}
