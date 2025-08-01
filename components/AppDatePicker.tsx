import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, Platform, Text, View } from "react-native";

const AppDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onStartChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStart(Platform.OS === "ios"); // iOS needs picker to remain visible
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(selectedDate); // adjust endDate if it's before new startDate
      }
    }
  };

  const onEndChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEnd(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
      if (selectedDate < startDate) {
        setStartDate(selectedDate); // adjust startDate if it's after new endDate
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Start Date: {startDate.toDateString()}</Text>
      <Button onPress={() => setShowStart(true)} title="Select Start Date" />

      {showStart && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onStartChange}
          maximumDate={endDate}
        />
      )}

      <View style={{ height: 20 }} />

      <Text>End Date: {endDate.toDateString()}</Text>
      <Button onPress={() => setShowEnd(true)} title="Select End Date" />

      {showEnd && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onEndChange}
          minimumDate={startDate}
        />
      )}
    </View>
  );
};

export { AppDatePicker };
