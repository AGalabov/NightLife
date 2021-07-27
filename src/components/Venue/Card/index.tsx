import React from 'react';

import { Avatar, Caption, Card, Title } from 'react-native-paper';
import { black } from '../../../assets/colors';
import { Venue } from '../../../models';

interface VenueCardProps {
  venue: Venue;
}

type AvatarImageProps = {
  uri: string;
  size?: number;
};

const LeftContent = ({ uri, size }: AvatarImageProps) => (
  <Avatar.Image
    size={size}
    source={{
      uri,
    }}
  />
);

function VenueTitle({ venue }: { venue: Venue }) {
  return (
    <Title style={{ color: black }}>
      {venue.name} - {venue.city}
    </Title>
  );
}

function VenueSubtitle({ venue }: { venue: Venue }) {
  return (
    <Caption style={{ color: black }}>За резервации: {venue.phone}</Caption>
  );
}

function RightContent({ venue }: { venue: Venue }) {
  return <Title style={{ backgroundColor: black }}>{venue.rating} / 5</Title>;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Card
      elevation={5}
      // TODO: Venue specific page
      // onPress={() => navigate('EventDetails', { eventId: event.eventId })}
    >
      <Card.Cover
        source={{
          // TODO: Centered pinpoint
          uri:
            'https://i.insider.com/5c954296dc67671dc8346930?width=1136&format=jpeg',
        }}
      />
      <Card.Title
        title={<VenueTitle venue={venue} />}
        titleNumberOfLines={2}
        subtitle={<VenueSubtitle venue={venue} />}
        left={(props) => <LeftContent uri={venue.logoUri} {...props} />}
        right={() => <RightContent venue={venue} />}
      />
    </Card>
  );
}
