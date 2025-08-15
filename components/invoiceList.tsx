import { Item } from "@/components/item";
import { Divider } from "@/components/ui/divider";
import { getInvoiceList } from "@/features/invoiceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Invoice } from "@/types/invoice";
import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

export function InvoiceList() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const { invoices, startDate, endDate, searchWord } = useAppSelector(
    (state) => state.invoice
  );

  const refreshList = useCallback(() => {
    setRefreshing(true);
    dispatch(getInvoiceList({ startDate, endDate, searchWord }));
    setRefreshing(false);
  }, [dispatch, startDate, endDate, searchWord]);
  const renderItem: ListRenderItem<Invoice> = ({ item }) => (
    <Item item={item} />
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider className="my-0.5" />}
      refreshing={refreshing}
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
