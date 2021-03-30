import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Button } from 'react-native-paper';
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
  return (
    <PageWrapper scrollable>
      <View style={styles.root}>
        <Paragraph>Search</Paragraph>

        <Button onPress={() => navigate('EventDetails')}>
          <Paragraph>Go to Event Details</Paragraph>
        </Button>
        <Button onPress={() => goBack()}>
          <Paragraph>Go back</Paragraph>
        </Button>
      </View>
    </PageWrapper>
  );
}
