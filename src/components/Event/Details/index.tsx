import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Divider, Headline, Paragraph, Title } from 'react-native-paper';
import { Event, Venue } from '../../../models';
import { VenueCard } from '../../Venue/Card';

interface EventDetailsProps {
  event: Event;
  venue: Venue;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 8,
  },
});

export function EventDetails({ event, venue }: EventDetailsProps) {
  return (
    <>
      <Image
        source={{
          uri:
            'https://zavedenia.com/zimages/sofia/big/2353/23533d3098b5a4755e2e0dde5205c623f936.jpg',
          height: 400,
        }}
      />
      <View style={styles.container}>
        <Title style={styles.title}>{event.title}</Title>
        <Divider style={styles.divider} />
        <Paragraph>{event.description}</Paragraph>
        <Divider style={styles.divider} />
        <Headline>Цена:</Headline>
        <Paragraph>{event.price}</Paragraph>
        <Divider style={styles.divider} />
        <Headline>За заведението:</Headline>
        <VenueCard venue={venue} />

        <Divider style={styles.divider} />
        <Headline>Коментари:</Headline>
        <Divider style={styles.divider} />

        {/* TODO: Optional - not by design */}
        {/* <Headline>За изпълнителят:</Headline> */}
        {/* TODO: Artist Card */}
        {/* <Paragraph>{event.artistId}</Paragraph> */}

        <Divider style={styles.divider} />
        <Headline>Вижте още:</Headline>
        {/* TODO: EventList of similar events */}
      </View>
    </>
  );
}
