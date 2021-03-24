export interface Event {
  eventId: number;
  title: string;
  date: string;
  price: number;
  description: string;
  photos: {}[];
  venueId: number;
  artist: string;
  artistId?: number;
}

interface WorkingHours {
  start: string;
  end: string;
}

export interface Venue {
  venueId: number;
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
