import { setEndDate, setStartDate } from "@/features/invoiceSlice";
import { useAppDispatch } from "@/store/hooks";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, Platform, Text, View } from "react-native";

const AppDatePicker = () => {
  // const { startDate, endDate } = useAppSelector((state) => state.invoice);
  //
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const dispatch = useAppDispatch();

  const onStartChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStart(Platform.OS === "ios"); // iOS needs picker to remain visible
    if (selectedDate) {
      setFromDate(selectedDate);
      dispatch(setStartDate(selectedDate.toISOString()));
      if (selectedDate > toDate) {
        setToDate(selectedDate); // adjust endDate if it's before new startDate
        dispatch(setEndDate(selectedDate.toISOString()));
      }
    }
  };

  const onEndChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEnd(Platform.OS === "ios");
    if (selectedDate) {
      setToDate(selectedDate);
      dispatch(setEndDate(selectedDate.toISOString()));
      if (selectedDate < fromDate) {
        setFromDate(selectedDate); // adjust startDate if it's after new endDate
        dispatch(setStartDate(selectedDate.toISOString()));
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Start Date: {fromDate.toDateString()}</Text>
      <Button onPress={() => setShowStart(true)} title="Select Start Date" />

      {showStart && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={onStartChange}
          maximumDate={toDate}
        />
      )}

      <View style={{ height: 20 }} />

      <Text>End Date: {toDate.toDateString()}</Text>
      <Button onPress={() => setShowEnd(true)} title="Select End Date" />

      {showEnd && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={onEndChange}
          minimumDate={fromDate}
        />
      )}
    </View>
  );
};

export { AppDatePicker };
