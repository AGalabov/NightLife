export type MusicCategory =
  | 'rap'
  | 'rock'
  | 'reggaeton'
  | 'pop-folk'
  | 'pop'
  | 'county'
  | 'other';

export interface Event {
  eventId: string;
  title: string;
  date: string;
  price: number;
  musicCategories: MusicCategory[];
  description: string;
  photos: {}[];
  venueId: string;
  artist: string;
  artistId?: string;
}

interface WorkingHours {
  start: string;
  end: string;
}

export interface Venue {
  venueId: string;
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
