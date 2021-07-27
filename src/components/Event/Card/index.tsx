import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { backgroundGray } from '../../../assets/colors';
import { useCustomNavigation } from '../../../hooks/use-custom-navigation';
import { Event } from '../../../models';

interface EventCardProps {
  event: Event;
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

const styles = StyleSheet.create({
  cardContainer: { backgroundColor: backgroundGray, opacity: 0.95 },
});

export function EventCard({ event }: EventCardProps) {
  const { navigate } = useCustomNavigation();
  return (
    <Card
      elevation={5}
      style={styles.cardContainer}
      onPress={() => navigate('EventDetails', { eventId: event.eventId })}>
      <Card.Cover
        source={{
          uri: event.coverPhoto,
        }}
      />
      <Card.Title
        title={event.title}
        subtitle={event.date}
        left={(props) => <LeftContent uri={event.venueLogoUri} {...props} />}
      />
    </Card>
  );
}
