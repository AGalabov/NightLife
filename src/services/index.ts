/* eslint-disable class-methods-use-this */
import { uniqueId } from 'lodash';
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
  return [
    ...generateEventsFor('pop-folk', 5),
    ...generateEventsFor('rock', 3),
    ...generateEventsFor('pop', 4),
    ...generateEventsFor('county', 1),
    ...generateEventsFor('other', 6),
    ...generateEventsFor('reggaeton', 2),
    ...generateEventsFor('rap', 2),
  ];
}

class Client {
  getVenues(): Promise<Venue[]> {
    return Promise.resolve(data.venues);
  }

  getEvents(): Promise<Event[]> {
    const events = generateEvents();
    return Promise.resolve(events);
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
