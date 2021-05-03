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
import { RadioGroup } from '../RadioGroup';
import { black } from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
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

const sortingOptions = [
  { value: SortingCriteria.DATE, label: 'By Date' },
  { value: SortingCriteria.PRICE, label: 'By Price' },
  { value: SortingCriteria.RATING, label: 'By Rating' },
];

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
  const [sortBy, setSortBy] = useState<SortingOptions>({
    criteria: SortingCriteria.PRICE,
    order: SortingOrder.ASC,
  });

  const onPress = () => {
    onSearchPerform(transformCategoriesMap(categoriesMap), sortBy);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      contentContainerStyle={styles.container}>
      <ScrollView>
        <Headline>Sort</Headline>
        <RadioGroup
          options={sortingOptions}
          selectedValue={sortBy.criteria}
          onClick={(value) =>
            setSortBy((prev) => ({
              ...prev,
              criteria: value,
            }))
          }
        />

        <Headline>Music Type</Headline>
        <FlatGrid
          itemDimension={110}
          data={categories}
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
              initiallyChecked={categoriesMap[category]}
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
