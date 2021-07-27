import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';
import { EventList } from '../components/Event/List';
import { SearchHeader } from '../components/Search/Header';
import { RefinementPopup } from '../components/Search/RefinementPopup';
import { useAsync } from '../hooks/use-async';
import { useAsyncAction } from '../hooks/use-async-action';
import { Event } from '../models';
import { search, SearchParams } from '../services/search-service';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  eventList: {
    marginTop: 16,
  },
});

export function SearchScreen() {
  const [events, setEvents] = useState<Event[]>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Currently there are 2 options:
  // - search by query
  // - filter + sort from the refinement popup
  // => they should probably be unified (common state would be required)
  const { perform: loadEvents } = useAsyncAction(
    async (params: SearchParams = {}) => {
      const fetchedEvents = await search.search(params);
      setEvents(fetchedEvents);
    },
    [],
  );

  // Used for the initial load of all events - an alternative could be to
  // showcase the search options with no initial results
  useAsync(async () => {
    loadEvents();
  }, [loadEvents]);

  const header = (
    <SearchHeader
      isList
      // TODO: Change the view once the map integration is complete
      onChangeViewClick={() => {}}
      onRefineClick={() => setIsModalOpen(true)}
      onSearchPerform={(query) => loadEvents({ query })}
    />
  );

  return (
    <>
      <PageWrapper header={header} scrollable>
        {events && <EventList events={events} style={styles.eventList} />}
      </PageWrapper>
      <Portal>
        <RefinementPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSearchPerform={(categories, sortBy) =>
            loadEvents({ categories, sortBy })
          }
        />
      </Portal>
    </>
  );
}
