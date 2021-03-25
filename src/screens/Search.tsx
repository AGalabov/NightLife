import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
    <PageWrapper>
      <View style={styles.root}>
        <Text>Search</Text>

        <Button
          title="Go to Event Details"
          onPress={() => navigate('EventDetails')}
        />
        <Button title="Go back" onPress={() => goBack()} />
      </View>
    </PageWrapper>
  );
}
