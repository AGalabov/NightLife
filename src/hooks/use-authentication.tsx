import { useContext } from 'react';
import { UserContext } from '../context/user';
import { Venue, Profile } from '../models';
import { client } from '../services';
import { useAsync } from './use-async';

type AuthProfile =
  | { type: 'venue'; venue: Venue }
  | { type: 'regular'; profile: Profile };

export function useAuthentication() {
  const { userId, ...rest } = useContext(UserContext);

  const { data } = useAsync<AuthProfile | undefined>(async () => {
    if (!userId) {
      return Promise.resolve(undefined);
    }

    const profile = await client.getProfile(userId);

    console.log({ user: profile });

    if (profile.type === 'venue') {
      const venue = await client.getVenueById(userId);
      return {
        type: 'venue',
        venue,
      };
    }

    return {
      type: 'regular',
      profile,
    };
  }, [userId]);

  return {
    profile: data,
    isGuest: !userId,
    isVenue: data?.type === 'venue',
    ...rest,
  };
}
