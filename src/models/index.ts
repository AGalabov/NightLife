const categoryValues = [
  'rap',
  'rock',
  'reggaeton',
  'pop-folk',
  'pop',
  'county',
  'other',
] as const;
export type MusicCategory = typeof categoryValues[number];
export const categories = (categoryValues as unknown) as MusicCategory[];

export interface Comment {
  author: string;
  comment: string;
}

export interface Event {
  eventId: string;
  title: string;
  date: string;
  coverPhoto: string;
  price: number;
  musicCategories: MusicCategory[];
  description: string;
  photos: {}[];
  comments: Comment[];
  venueId: string;
  venueLogoUri: string;
  artistId?: string;
}

export interface Venue {
  logoUri: string;
  coordinates: {
    Latitude: number;
    Longitude: number;
  };
  name: string;
  phone: string;
  rating: number;
  address: string;
  city: string;
}

export type ProfileType = 'regular' | 'venue';

export interface Profile {
  email: string;
  type: ProfileType;
  userId: string;
  firstName: string;
  lastName: string;
  favoriteVenues: string[];
  favoriteArtists: string[];
  visitedEvents: string[];
}

export interface Artist {
  artistId: string;
  firstName: string;
  lastName: string;
  avatarUri: string;
}
