import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCustomNavigation } from '../hooks/use-custom-navigation';

export function SearchScreen() {
  const { navigate, goBack } = useCustomNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
      }}>
      <Text>Search</Text>

      <Button
        title="Go to Event Details"
        onPress={() => navigate('EventDetails')}
      />
      <Button title="Go back" onPress={() => goBack()} />
    </View>
  );
}
