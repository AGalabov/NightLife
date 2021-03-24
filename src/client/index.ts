/* eslint-disable class-methods-use-this */
import { Venue, Event } from '../models';
import data from './data.json';

class Client {
  getVenues(): Promise<Venue[]> {
    return Promise.resolve(data.venues);
  }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(data.events);
  }
}

export const client = new Client();
