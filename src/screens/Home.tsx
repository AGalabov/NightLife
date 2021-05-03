import React, { useEffect, useState } from 'react';
import { client } from '../services';
import { EventList } from '../components/Event/List';
import { Event } from '../models';
import { PageWrapper } from './PageWrapper';

export function HomeScreen() {
  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const asyncAction = async () => {
      const fetchedEvents = await client.getEvents();
      setEvents(fetchedEvents);
    };
    asyncAction();
  }, []);

  return (
    <PageWrapper scrollable>
      {events && <EventList events={events} />}
    </PageWrapper>
  );
}
