import React from 'react';
import { View, Text } from 'react-native';
import { PageWrapper } from './PageWrapper';

export function EventDetailsScreen() {
  return (
    <PageWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Text>EventDetails</Text>
      </View>
    </PageWrapper>
  );
}
