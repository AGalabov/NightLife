import React from 'react';
import { View, Text } from 'react-native';
import { PageWrapper } from './PageWrapper';

export function AddEventScreen() {
  return (
    <PageWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Text>Add Event Screen!</Text>
      </View>
    </PageWrapper>
  );
}
