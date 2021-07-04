import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs, { Dayjs } from 'dayjs';
import { TextInput } from '../TextInput';

interface DatePickerProps {
  onDateChange: (date: Dayjs) => void;
}

export const DatePicker = ({ onDateChange }: DatePickerProps) => {
  const [date, setDate] = useState(dayjs());
  const [mode, setMode] = useState<'date' | 'time'>();

  useEffect(() => {
    onDateChange(date);
    // Only for the initial set of "today"/"now" with the initial value of dayjs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDateChange]);

  return (
    <View>
      <TextInput
        label="Дата"
        value={date.format('DD/MM/YYYY')}
        placeholder="Избери дата"
        showSoftInputOnFocus={false}
        onTouchStart={(e) => {
          e.preventDefault();
          setMode('date');
        }}
        onChange={() => {}}
      />

      <TextInput
        label="Час"
        value={date.format('hh:mmA')}
        placeholder="Избери час"
        showSoftInputOnFocus={false}
        onTouchStart={(e) => {
          e.preventDefault();
          setMode('time');
        }}
        onChange={() => {}}
      />
      {mode && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date.toDate()}
          mode={mode}
          minimumDate={dayjs().toDate()}
          is24Hour
          onChange={(_e: Event, chosenDate?: Date) => {
            if (chosenDate) {
              const dateToUse = dayjs(chosenDate);
              setDate(dateToUse);
              onDateChange(dateToUse);
            }
            setMode(undefined);
          }}
        />
      )}
    </View>
  );
};
