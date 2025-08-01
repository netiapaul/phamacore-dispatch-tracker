import { InvoiceList } from "@/components/invoiceList";
import { ItemSearch } from "@/components/ItemSearch";
import { ReceiveNavBar } from "@/components/ReceiveNavBar";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { InfoIcon } from "@/components/ui/icon";
import { getInvoiceList } from "@/features/invoiceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet } from "react-native";

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
      <StatusBar barStyle={"light-content"} />
      <ItemSearch />
      {error && (
        <Alert className="items-start" action="error">
          <AlertIcon as={InfoIcon} size="md" />
          <AlertText size="md">{error}</AlertText>
        </Alert>
      )}
      {isLoading && <ActivityIndicator />}
      <InvoiceList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
