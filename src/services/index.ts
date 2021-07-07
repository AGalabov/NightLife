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

class Client {
  private events: Event[];

  constructor() {
    // Generates some event mock data that we want
    // to keep as persistent during the browsing
    this.events = generateEvents();
  }

  getVenues(): Promise<Venue[]> {
    return Promise.resolve(data.venues);
  }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(this.events);
  }

  // TODO: Error handling
  getEventById(id: string): Promise<Event | undefined> {
    return Promise.resolve(this.events.find((event) => event.eventId === id));
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
      type: type ?? 'regular',
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

  async testAdd(addEventData: AddEventFormValues) {
    console.log('Triggered request');
    const requestData = {
      ...addEventData,
      artistId: '2',
      comments: [],
      photos: [],
      venueId: '1', // TODO: Get from current venue
      venueLogoUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmPg56VdVIp7iaYiuUWN-rwesnxdZtd2raLA&usqp=CAU',
    };

    const result = await firestore().collection('test').add(requestData);

    console.log(result);
  }
}

export const client = new Client();
