import { Item } from "@/components/item";
import { Divider } from "@/components/ui/divider";
import { useAppSelector } from "@/store/hooks";
import { Invoice } from "@/types/invoice";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

export function InvoiceList() {
  // const [refreshing, setRefreshing] = useState(false);

  const { isLoading } = useAppSelector((state) => state.invoice);

  const { invoices, startDate, endDate, searchWord } = useAppSelector(
    (state) => state.invoice
  );
  console.log("Rendering InvoiceList", invoices);

  const refreshList = useCallback(() => {
    // setRefreshing(true);
    // dispatch(fetchDataInvoices(startDate, endDate, searchWord));
    // setRefreshing(false);
    // [dispatch, selectedDate, selectedFilter, searchWord]
  }, []);

  const renderItem: ListRenderItem<Invoice> = ({ item }) => (
    <Item item={item} />
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider className="my-0.5" />}
      refreshing={isLoading}
      onRefresh={refreshList}
      style={styles.sectionContainer}
      data={invoices}
      renderItem={renderItem}
      keyExtractor={(item) => item.docNumber}
    />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 4,
    marginBottom: 60,
  },
});
