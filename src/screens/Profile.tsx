import React from 'react';
import { Button, View, Text } from 'react-native';
import { useUser } from '../hooks/use-user';
import { PageWrapper } from './PageWrapper';

export function ProfileScreen() {
  const { login, logout, user, isGuest } = useUser();

  return (
    <PageWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
        }}>
        <Text>Profile! - {user?.type}</Text>
        {isGuest ? (
          <>
            <Button
              title="Log as Admin"
              onPress={() =>
                login({ email: '', firstName: '', lastName: '', type: 'admin' })
              }
            />

            <Button
              title="Log as Regular"
              onPress={() =>
                login({
                  email: '',
                  firstName: '',
                  lastName: '',
                  type: 'regular',
                })
              }
            />
          </>
        ) : (
          <Button title="Logout" onPress={logout} />
        )}
      </View>
    </PageWrapper>
  );
}
