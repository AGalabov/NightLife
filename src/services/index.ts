/* eslint-disable class-methods-use-this */
import { shuffle, uniqueId } from 'lodash';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Venue,
  Event,
  Profile,
  MusicCategory,
  Artist,
  ProfileType,
} from '../models';
import data from './data.json';

function getRandomPrice() {
  return Math.floor(Math.random() * 20);
}

function generateEventsFor(category: MusicCategory, count: number): Event[] {
  return Array.from(Array(count).keys()).map(() => {
    const id = uniqueId();
    const eventTemplate = data.events[0] as Event;
    return {
      ...eventTemplate,
      eventId: id,
      musicCategories: [category],
      title: `${category} event - ${id}`,
      price: getRandomPrice(),
    };
  });
}

function generateEvents() {
  return shuffle([
    ...generateEventsFor('pop-folk', 5),
    ...generateEventsFor('rock', 3),
    ...generateEventsFor('pop', 4),
    ...generateEventsFor('county', 1),
    ...generateEventsFor('other', 6),
    ...generateEventsFor('reggaeton', 2),
    ...generateEventsFor('rap', 2),
  ]);
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  type: ProfileType;
}

export interface AddEventFormValues {
  title: string;
  date: string;
  musicCategories: MusicCategory[];
  price: number;
  description: string;
  coverPhoto: string;
  // TODO: This is probably how it should be
  artistId?: string;
}

export interface AddEventData extends AddEventFormValues {
  venueId: string;
  venueLogoUri: string;
}

class Client {
  private events: Event[];

  constructor() {
    // Generates some event mock data that we want
    // to keep as persistent during the browsing
    this.events = generateEvents();
  }

  async getEvents(): Promise<Event[]> {
    const allEvents = await firestore().collection<Event>('events').get();
    return allEvents.docs.map((doc) => ({
      ...doc.data(),
      eventId: doc.id,
    }));
  }

  // TODO: Error handling
  async getEventById(id: string): Promise<Event | undefined> {
    const event = await firestore().collection<Event>('events').doc(id).get();
    return event.data();
  }

  async addEvent(addEventData: AddEventData) {
    const requestData = {
      ...addEventData,
      // TODO: temp
      artistId: '2',
      comments: [],
      photos: [],
    };

    const res = await firestore().collection('events').add(requestData);
    return { eventId: res.id };
  }

  async getProfile(id: string): Promise<Profile> {
    const profileDocument = await firestore()
      .collection<Profile>('users')
      .doc(id)
      .get();
    const profile = profileDocument.data();

    if (!profileDocument.exists || !profile) {
      throw new Error('Oops something went wrong');
    }

    return profile;
  }

  async getVenueById(id: string): Promise<Venue> {
    const profileDocument = await firestore()
      .collection<Venue>('venues')
      .doc(id)
      .get();
    const venue = profileDocument.data();

    if (!profileDocument.exists || !venue) {
      throw new Error('Oops something went wrong');
    }

    return venue;
  }

  getArtistById(id: string): Promise<Artist | undefined> {
    return Promise.resolve(
      data.artists.find((artist) => artist.artistId === id),
    );
  }

  async login(email: string, password: string): Promise<{ userId: string }> {
    const result = await auth().signInWithEmailAndPassword(email, password);
    const userId = result.user.uid;

    return { userId };
  }

  async signUp({
    email,
    password,
    fullName,
    type,
  }: SignUpData): Promise<{ userId: string }> {
    const result = await auth().createUserWithEmailAndPassword(email, password);
    const userId = result.user.uid;

    const [firstName, lastName] = fullName.trim().split(' ') as [
      string,
      string,
    ];

    const profile: Profile = {
      email,
      firstName,
      lastName,
      type,
      userId,
      favoriteArtists: [],
      favoriteVenues: [],
      visitedEvents: [],
    };

    await firestore().collection('users').doc(userId).set(profile);
    return { userId };
  }

  async logout(): Promise<void> {
    await auth().signOut();
  }
}

export const client = new Client();
