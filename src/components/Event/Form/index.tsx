import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { AddEventFormValues } from '../../../services';
import { DatePicker } from '../../Form/DatePicker';
import { NumberInput } from '../../Form/NumberInput';
import { TextInput } from '../../Form/TextInput';

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
  button: {
    height: 50,
    marginTop: 16,
    justifyContent: 'center',
  },
});
interface EventFormProps {
  onSubmit: (data: AddEventFormValues) => Promise<void>;
  style?: ViewStyle;
}

export function EventForm({ onSubmit, style }: EventFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
  } = useForm<AddEventFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      date: '',
      musicCategories: [],
      price: 0,
      description: '',
    },
  });

  useEffect(() => {
    register('title', {
      required: 'Title is required',
    });
    register('date', {
      required: 'Date is required',
    });
    register('musicCategories');
    register('price');
    register('artistId');
    register('coverPhoto');
    register('description', {
      required: 'Description is required',
    });
  }, [register]);

  return (
    <View style={style}>
      <DatePicker
        onDateChange={(date) => setValue('date', date.toISOString())}
      />
      <TextInput
        label="Title"
        placeholder="Enter title"
        boxStyle={styles.input}
        error={errors.title?.message}
        onChange={(value) => setValue('title', value)}
      />

      <TextInput
        label="Photo"
        placeholder="Add photo url"
        boxStyle={styles.input}
        error={errors.title?.message}
        onChange={(value) => setValue('coverPhoto', value)}
      />
      <TextInput
        label="Event type"
        placeholder="Choose a type"
        boxStyle={styles.input}
        error={errors.musicCategories?.message}
        onChange={(value) => setValue('musicCategories', [value])}
      />

      <NumberInput
        label="Price"
        style={styles.input}
        onValueChange={(price) => setValue('price', price)}
      />

      <TextInput
        label="Description"
        placeholder="Add a description for your event"
        multiline
        numberOfLines={6}
        boxStyle={styles.input}
        error={errors.description?.message}
        onChange={(value) => setValue('description', value)}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        Add Event
      </Button>
    </View>
  );
}
