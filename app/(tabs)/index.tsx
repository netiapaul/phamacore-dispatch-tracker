import { DateFilter } from "@/components/DateFilter";
import { ItemSearch } from "@/components/ItemSearch";
import { ReceiveNavBar } from "@/components/ReceiveNavBar";
import { StatusBar, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ReceiveNavBar />
      {/* <StatusBar barStyle={isDarkMode ? "dark-content" : "light-content"} /> */}
      <StatusBar barStyle={"light-content"} />
      <ItemSearch />
      <DateFilter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
