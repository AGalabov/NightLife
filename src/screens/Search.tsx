import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Button, Portal } from 'react-native-paper';
// import { EventList } from '../components/Event/List';
import { SearchPopup } from '../components/SearchPopup';
import { useCustomNavigation } from '../hooks/use-custom-navigation';
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
  const { navigate, goBack } = useCustomNavigation();
  // const [events, setEvents] = useState<Event[]>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const asyncAction = async () => {
  //     const fetchedEvents = await search.search({ categories, query, sortBy });
  //     setEvents(fetchedEvents);
  //   };
  //   asyncAction();
  // }, []);

  return (
    <>
      <PageWrapper scrollable>
        <View style={styles.root}>
          <Paragraph>Search</Paragraph>

          <Button onPress={() => navigate('EventDetails')}>
            <Paragraph>Go to Event Details</Paragraph>
          </Button>
          <Button onPress={() => goBack()}>
            <Paragraph>Go back</Paragraph>
          </Button>

          <Button onPress={() => setIsModalOpen(true)}>
            <Paragraph>Open Modal</Paragraph>
          </Button>
        </View>
        {/* {events && <EventList events={events} />} */}
      </PageWrapper>
      <Portal>
        <SearchPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // eslint-disable-next-line no-console
          onSearchPerform={console.log}
        />
      </Portal>
    </>
  );
}
