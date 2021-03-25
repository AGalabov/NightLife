import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export function AddEventScreen() {
  return (
    <PageWrapper>
      <View style={styles.root}>
        <Text>Add Event Screen!</Text>
      </View>
    </PageWrapper>
  );
}
