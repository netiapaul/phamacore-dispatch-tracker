import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export function DateFilter() {
  return (
    <TouchableHighlight underlayColor={"#ffe0b2"} className="px-5">
      <View style={styles.container}>
        <Text style={styles.date}>
          {`From: ${new Intl.DateTimeFormat("en-GB").format(
            new Date()
          )} To: ${new Intl.DateTimeFormat("en-GB").format(new Date())}`}
          {/* {`From: ${Moment(selectedDate.startDate).format(
            "DD-MM-YY"
          )}  To: ${Moment(selectedDate.endDate).format("DD-MM-YY")}`} */}
        </Text>
        <View style={styles.selectText}>
          <Text>Select Date &gt;&gt;</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginHorizontal: 2 },
  selectText: {
    marginLeft: "auto",
  },
  date: {
    color: "#f57c00",
  },
});
