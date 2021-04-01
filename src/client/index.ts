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
