/* eslint-disable class-methods-use-this */
import { Venue, Event, Profile } from '../models';
import data from './data.json';

class Client {
  getVenues(): Promise<Venue[]> {
    return Promise.resolve(data.venues);
  }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(data.events);
  }

  getProfile(id: number): Promise<Profile> {
    return Promise.resolve(
      data.profiles.find((profile) => profile.userId === id)!,
    );
  }
}

export const client = new Client();
