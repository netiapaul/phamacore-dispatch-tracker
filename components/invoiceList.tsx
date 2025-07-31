import { Item } from "@/components/item";
import { Divider } from "@/components/ui/divider";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export function InvoiceList() {
  const [refreshing, setRefreshing] = useState(false);

  const refreshList = useCallback(() => {
    setRefreshing(true);
    // dispatch(fetchDataInvoices(selectedDate, selectedFilter, searchWord));
    setRefreshing(false);
    // [dispatch, selectedDate, selectedFilter, searchWord]
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider className="my-0.5" />}
      refreshing={refreshing}
      onRefresh={refreshList}
      style={styles.sectionContainer}
      //   data={invoices}
      data={[]}
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
