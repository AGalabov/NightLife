import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCustomNavigation } from '../hooks/use-custom-navigation';

export function HomeScreen() {
  const { goBack, navigate } = useCustomNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <Text>Home!</Text>

      <Button
        title="Go to Event Details"
        onPress={() => navigate('EventDetails')}
      />
      <Button title="Go back" onPress={() => goBack()} />
    </View>
  );
}
