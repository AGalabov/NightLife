import { compact } from 'lodash';
import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Title, Caption, Paragraph } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { backgroundGray } from '../../assets/colors';
import { useAsync } from '../../hooks/use-async';
import { useAuthentication } from '../../hooks/use-authentication';
import { Profile } from '../../models';
import { client } from '../../services';

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
  menu: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: backgroundGray,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favorites: {
    maxHeight: 300,
    padding: 8,
    backgroundColor: backgroundGray,
    alignSelf: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  noResults: {
    backgroundColor: backgroundGray,
    height: 300,
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  noResultText: {
    textAlign: 'center',
  },
  favoritesContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 24,
  },
});

interface ProfileContentProps {
  profile: Profile;
}

type DisplayItems = 'favorite-artists' | 'favorite-venues' | 'visited-events';

interface FavoriteSectionProps {
  uris: string[];
  itemSize: number;
}

function FavoriteSection({ uris, itemSize }: FavoriteSectionProps) {
  if (uris.length === 0) {
    return (
      <View style={styles.noResults}>
        <Title style={styles.noResultText}>Няма резултати</Title>
      </View>
    );
  }

  return (
    <FlatGrid
      itemDimension={itemSize}
      data={uris}
      style={styles.favorites}
      contentContainerStyle={styles.favoritesContent}
      renderItem={({ item: uri }) => (
        <Avatar.Image
          source={{
            uri,
          }}
          size={itemSize}
        />
      )}
    />
  );
}

export function ProfileContent({ profile }: ProfileContentProps) {
  const { logout } = useAuthentication();
  const { data } = useAsync(async () => {
    const venues = await Promise.all(
      profile.favoriteVenues.map((venueId) => client.getVenueById(venueId)),
    );
    const artists = await Promise.all(
      profile.favoriteArtists.map((artistId) => client.getArtistById(artistId)),
    );

    const events = await Promise.all(
      profile.visitedEvents.map((eventId) => client.getEventById(eventId)),
    );

    // TODO: That's not great but will work for now
    return {
      favoriteVenues: compact(venues),
      favoriteArtists: compact(artists),
      visitedEvents: compact(events),
    };
  }, [profile]);

  const [displayItems, setDisplayItems] = useState<DisplayItems>(
    'visited-events',
  );

  return (
    <>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
          size={100}
        />
        <Title style={styles.title}>
          {profile.firstName} {profile.lastName}
        </Title>
        <Caption style={styles.caption}>{profile.email}</Caption>
      </View>
      <View style={styles.menu}>
        <Button
          disabled={displayItems === 'visited-events'}
          uppercase={false}
          onPress={() => setDisplayItems('visited-events')}>
          Last visited
        </Button>
        <Button
          disabled={displayItems === 'favorite-artists'}
          onPress={() => setDisplayItems('favorite-artists')}
          uppercase={false}>
          My Artists
        </Button>
        <Button
          disabled={displayItems === 'favorite-venues'}
          onPress={() => setDisplayItems('favorite-venues')}
          uppercase={false}>
          My Venues
        </Button>
      </View>

      {data && (
        <>
          {displayItems === 'visited-events' && data.visitedEvents && (
            <FavoriteSection
              itemSize={90}
              uris={data.visitedEvents.map(({ coverPhoto }) => coverPhoto)}
            />
          )}
          {displayItems === 'favorite-artists' && data.favoriteArtists && (
            <FavoriteSection
              itemSize={90}
              uris={data.favoriteArtists.map(({ avatarUri }) => avatarUri)}
            />
          )}
          {displayItems === 'favorite-venues' && data.favoriteVenues && (
            <FavoriteSection
              itemSize={90}
              uris={data.favoriteVenues.map(({ logoUri }) => logoUri)}
            />
          )}
        </>
      )}

      <Button mode="contained" style={styles.logoutButton} onPress={logout}>
        <Paragraph>Logout</Paragraph>
      </Button>
    </>
  );
}
