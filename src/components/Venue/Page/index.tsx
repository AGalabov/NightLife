import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Title, Caption, Paragraph } from 'react-native-paper';
import { useAuthentication } from '../../../hooks/use-authentication';
import { Venue } from '../../../models';

const styles = StyleSheet.create({
  userInfoSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 12,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  logoutButton: {
    marginTop: 24,
  },
});

interface VenuePageProps {
  venue: Venue;
}

export function VenuePage({ venue }: VenuePageProps) {
  const { logout } = useAuthentication();

  return (
    <>
      <View style={styles.userInfoSection}>
        <Avatar.Image source={{ uri: venue.logoUri }} size={100} />
        <Title style={styles.title}>{venue.name}</Title>
        <Caption style={styles.caption}>
          {venue.city} - {venue.address}
        </Caption>
        <Caption style={styles.caption}>{venue.phone}</Caption>
      </View>

      <Button mode="contained" style={styles.logoutButton} onPress={logout}>
        <Paragraph>Logout</Paragraph>
      </Button>
    </>
  );
}
