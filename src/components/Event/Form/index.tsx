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
      required: 'Заглавието е задължително',
    });
    register('date', {
      required: 'Датата е задължителна',
    });
    register('musicCategories');
    register('price');
    register('artistId');
    register('coverPhoto');
    register('description', {
      required: 'Описанието е задължително',
    });
  }, [register]);

  return (
    <View style={style}>
      <DatePicker
        onDateChange={(date) => setValue('date', date.toISOString())}
      />
      <TextInput
        label="Заглавие"
        placeholder="Кратко заглавие"
        boxStyle={styles.input}
        error={errors.title?.message}
        onChange={(value) => setValue('title', value)}
      />

      <TextInput
        label="Снимка"
        placeholder="Добавете линк към снимка"
        boxStyle={styles.input}
        error={errors.title?.message}
        onChange={(value) => setValue('coverPhoto', value)}
      />
      <TextInput
        label="Тип на събитието"
        placeholder="Изберете тип"
        boxStyle={styles.input}
        error={errors.musicCategories?.message}
        onChange={(value) => setValue('musicCategories', [value])}
      />

      <NumberInput
        label="Цена"
        style={styles.input}
        onValueChange={(price) => setValue('price', price)}
      />

      <TextInput
        label="Описание"
        placeholder="Добавете описание на вашето събитие"
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
        Добави
      </Button>
    </View>
  );
}
