import { DateFilter } from "@/components/DateFilter";
import { InvoiceList } from "@/components/invoiceList";
import { ItemSearch } from "@/components/ItemSearch";
import { ReceiveNavBar } from "@/components/ReceiveNavBar";
import { getInvoiceList } from "@/features/invoiceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isLoading, startDate, endDate, searchWord, error } = useAppSelector(
    (state) => state.invoice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInvoiceList({ startDate, endDate, searchWord }));
  }, [dispatch, startDate, endDate, searchWord]);

  return (
    <SafeAreaView style={styles.container}>
      <ReceiveNavBar />
      {/* <StatusBar barStyle={isDarkMode ? "dark-content" : "light-content"} /> */}
      <StatusBar barStyle={"light-content"} />
      <ItemSearch />
      <DateFilter />
      <InvoiceList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
