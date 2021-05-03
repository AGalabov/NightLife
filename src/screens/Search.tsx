import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Button, Portal } from 'react-native-paper';
import { EventList } from '../components/Event/List';
import { SearchPopup } from '../components/SearchPopup';
import { MusicCategory, Event } from '../models';
import { search } from '../services/search-service';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export function SearchScreen() {
  const [events, setEvents] = useState<Event[]>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadEvents = useCallback(
    async (categories?: MusicCategory[], sortBy?) => {
      // TODO: Add query
      const fetchedEvents = await search.search({ categories, sortBy });
      setEvents(fetchedEvents);
    },
    [],
  );

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <>
      <PageWrapper scrollable>
        <View style={styles.root}>
          <Button onPress={() => setIsModalOpen(true)}>
            <Paragraph>Refine</Paragraph>
          </Button>
        </View>
        {events && <EventList events={events} />}
      </PageWrapper>
      <Portal>
        <SearchPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSearchPerform={loadEvents}
        />
      </Portal>
    </>
  );
}
