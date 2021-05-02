import React, { useState } from 'react';
import { Modal, Button, Headline } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import {
  SortingCriteria,
  SortingOptions,
  SortingOrder,
} from '../../services/search-service';
import { CheckboxButton } from '../CheckboxButton';
import { MusicCategory, categories } from '../../models';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1B1B',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 20,
  },
  button: { marginTop: 30 },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
  },
});

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchPerform: (
    categories: MusicCategory[],
    sortBy: SortingOptions,
  ) => void;
}

type CategoriesMap = {
  [key in MusicCategory]?: boolean;
};

function transformCategoriesMap(categoriesMap: CategoriesMap): MusicCategory[] {
  return Object.entries(categoriesMap).reduce(
    (acc, [categoryName, isSelected]) => {
      if (isSelected) {
        return [...acc, categoryName];
      }
      return acc;
    },
    [] as string[],
  ) as MusicCategory[];
}

export function SearchPopup({
  isOpen,
  onClose,
  onSearchPerform,
}: SearchPopupProps) {
  const [categoriesMap, setCategoriesMap] = useState<
    {
      [key in MusicCategory]?: boolean;
    }
  >({});
  const [sortBy] = useState<SortingOptions>({
    criteria: SortingCriteria.PRICE,
    order: SortingOrder.ASC,
  });

  const onPress = () => {
    onSearchPerform(transformCategoriesMap(categoriesMap), sortBy);
  };

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      contentContainerStyle={styles.container}>
      <ScrollView>
        <Headline>Music Type</Headline>
        <FlatGrid
          itemDimension={110}
          // TODO: Check this
          data={(categories as unknown) as MusicCategory[]}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item: category }) => (
            <CheckboxButton
              key={category}
              onPress={(isChecked) => {
                setCategoriesMap((prev) => ({
                  ...prev,
                  [category]: isChecked,
                }));
              }}
              label={category}
              style={styles.itemContainer}
            />
          )}
        />
        <Button style={styles.button} onPress={onPress}>
          Search
        </Button>
      </ScrollView>
    </Modal>
  );
}
