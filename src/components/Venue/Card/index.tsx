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
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xamboy.com%2F2019%2F06%2F05%2Fsetting-pickup-location-marker-using-google-maps-in-xamarin-forms%2F&psig=AOvVaw2oKmC0yRjtiA2FWX-9fYSN&ust=1625334223599000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNDd6b_4xPECFQAAAAAdAAAAABAF',
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
