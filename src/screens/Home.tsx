import React from 'react';
import { client } from '../services';
import { EventList } from '../components/Event/List';
import { PageWrapper } from './PageWrapper';
import { useAsync } from '../hooks/use-async';

export function HomeScreen() {
  const { data: events } = useAsync(() => client.getEvents(), []);

  return (
    <PageWrapper scrollable>
      {events && <EventList events={events} />}
    </PageWrapper>
  );
}
