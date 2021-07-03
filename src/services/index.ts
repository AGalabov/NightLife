/* eslint-disable class-methods-use-this */
import { shuffle, uniqueId } from 'lodash';
import { Venue, Event, Profile, MusicCategory } from '../models';
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

  // TODO: Error handling
  getVenueById(id: string): Promise<Venue | undefined> {
    return Promise.resolve(data.venues.find((venue) => venue.venueId === id));
  }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(this.events);
  }

  // TODO: Error handling
  getEventById(id: string): Promise<Event | undefined> {
    return Promise.resolve(this.events.find((event) => event.eventId === id));
  }

  getProfile(id: string): Promise<Profile> {
    const result = data.profiles.find((profile) => profile.userId === id);

    if (!result) {
      throw new Error('Oops something went wrong');
    }

    return Promise.resolve(result as Profile);
  }

  login(email: string, password: string): Promise<Profile> {
    const userData = data.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!userData) {
      throw new Error('Invalid user data');
    }

    return this.getProfile(userData.userId);
  }
}

export const client = new Client();
