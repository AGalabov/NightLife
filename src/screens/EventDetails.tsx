import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { PageWrapper } from './PageWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export function EventDetailsScreen() {
  return (
    <PageWrapper scrollable>
      <View style={styles.root}>
        <Paragraph>EventDetails</Paragraph>
      </View>
    </PageWrapper>
  );
}
