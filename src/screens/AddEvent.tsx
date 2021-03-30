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

export function AddEventScreen() {
  return (
    <PageWrapper scrollable>
      <View style={styles.root}>
        <Paragraph>Add Event Screen!</Paragraph>
      </View>
    </PageWrapper>
  );
}
