import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { client } from '../client';
import { EventList } from '../components/Event/List';
import { Event } from '../models';

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});

function PageWrapper({ children }: { children: ReactNode }) {
  return <ScrollView style={styles.wrapper}>{children}</ScrollView>;
}

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

  return (
    <PageWrapper>
      <Text>EventDetails</Text>
      {events && <EventList events={events} />}
    </PageWrapper>
  );
}
