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
  artist: string;
  artistId?: string;
}

interface WorkingHours {
  start: string;
  end: string;
}

export interface Venue {
  venueId: string;
  logoUri: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  name: string;
  phone: string;
  manager: string;
  workingHours: {
    monday?: WorkingHours;
    tuesday?: WorkingHours;
    wednesday?: WorkingHours;
    thursday?: WorkingHours;
    friday?: WorkingHours;
    saturday?: WorkingHours;
    sunday?: WorkingHours;
  };
  rating: number;
  address: string;
  city: string;
}

export interface Profile {
  email: string;
  type: 'regular' | 'admin';
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
