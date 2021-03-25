import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});

export function PageWrapper({ children }: { children: ReactNode }) {
  return <ScrollView style={styles.wrapper}>{children}</ScrollView>;
}
