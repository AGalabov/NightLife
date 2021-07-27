import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Divider, Headline, Paragraph, Title } from 'react-native-paper';
import { Event, Venue } from '../../../models';
import { CommentSection } from '../../CommentSection';
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
          uri: event.coverPhoto,
          height: 400,
        }}
      />
      <View style={styles.container}>
        <Title style={styles.title}>{event.title}</Title>
        <Divider style={styles.divider} />
        <Paragraph>{event.description}</Paragraph>
        <Divider style={styles.divider} />
        <Headline>Price:</Headline>
        <Paragraph>{event.price}</Paragraph>
        <Divider style={styles.divider} />
        <Headline>About the venue:</Headline>
        <VenueCard venue={venue} />

        <Divider style={styles.divider} />
        <Headline>Comments:</Headline>
        <CommentSection comments={event.comments} />

        <Divider style={styles.divider} />

        {/* TODO: Optional - not by design */}
        {/* <Headline>About the artist:</Headline> */}
        {/* TODO: Artist Card */}
        {/* <Paragraph>{event.artistId}</Paragraph> */}

        <Divider style={styles.divider} />
        <Headline>You might also like:</Headline>
        {/* TODO: EventList of similar events */}
      </View>
    </>
  );
}
