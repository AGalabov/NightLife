import React, { useEffect, useState } from 'react';
import { client } from '../client';
import { EventList } from '../components/Event/List';
import { Event } from '../models';
import { PageWrapper } from './PageWrapper';

export function HomeScreen() {
  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const asyncAction = async () => {
      const fetchedEvents = await client.getEvents();

      const replicated = Array(5).fill(fetchedEvents[0]);
      setEvents(replicated);
    };
    asyncAction();
  }, []);

  return <PageWrapper>{events && <EventList events={events} />}</PageWrapper>;
}
