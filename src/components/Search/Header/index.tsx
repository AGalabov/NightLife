import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { black, placeholderGray } from '../../../assets/colors';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: black,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
  },
});

const iconSize = 25;

interface SearchHeaderProps {
  onSearchPerform: (query: string) => void;
  onRefineClick: () => void;
  onChangeViewClick: () => void;
  isList: boolean;
}

export function SearchHeader({
  isList,
  onChangeViewClick,
  onRefineClick,
  onSearchPerform,
}: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.header}>
      <IconButton
        icon={isList ? 'map-marker' : 'format-list-bulleted'}
        size={iconSize}
        onPress={onChangeViewClick}
      />
      <Searchbar
        theme={{ colors: { text: black } }}
        placeholder="Search"
        iconColor={placeholderGray}
        style={styles.searchBar}
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={() => onSearchPerform(searchQuery)}
      />
      <IconButton icon="tune" size={iconSize} onPress={onRefineClick} />
    </View>
  );
}
