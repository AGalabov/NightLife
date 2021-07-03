import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { backgroundGray } from '../../../assets/colors';
import { useCustomNavigation } from '../../../hooks/use-custom-navigation';
import { Event } from '../../../models';

interface EventCardProps {
  event: Event;
}

type AvatarImageProps = {
  size?: number;
};

const LeftContent = (props: AvatarImageProps) => (
  <Avatar.Image
    {...props}
    source={{
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmPg56VdVIp7iaYiuUWN-rwesnxdZtd2raLA&usqp=CAU',
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
          uri:
            'https://zavedenia.com/zimages/sofia/big/2353/23533d3098b5a4755e2e0dde5205c623f936.jpg',
        }}
      />
      <Card.Title
        title={event.title}
        subtitle={event.date}
        left={LeftContent}
      />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}
