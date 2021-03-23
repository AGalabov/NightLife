import React from 'react';
import { Button, View, Text } from 'react-native';
import { useCustomNavigation } from '../hooks/use-custom-navigation';

export function ProfileScreen() {
  const { navigate } = useCustomNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}>
      <Text>Profile!</Text>
      <Button
        title="Go to Event Details"
        onPress={() => navigate('EventDetails')}
      />
    </View>
  );
}
