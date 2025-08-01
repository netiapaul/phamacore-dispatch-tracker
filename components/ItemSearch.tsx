// import { Heading } from "@/components/ui/heading";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DateFilter } from "./DateFilter";

const ItemSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query: string) => {
    // dispatch(setSearchWord(query));
    setSearchQuery(query);
  };
  return (
    <>
      <View className="p-5" style={styles.container}>
        <Input
          style={styles.inputContainer}
          className="text-center border-border-100"
          size="xl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Search"
            value={searchQuery}
            onChangeText={(value) => onChangeSearch(value)}
          />
          <InputSlot className="pr-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
        </Input>
      </View>
      <View className="px-5 py-2" style={styles.container1}>
        <DateFilter />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  action: { margin: 0 },
  container: { marginVertical: 6, flexDirection: "row" },
  container1: { flexDirection: "column" },
  inputContainer: {
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#ffb74d",
    height: 35,
    flex: 5,
  },
  input: { padding: 0, opacity: 0.7 },
});

export { ItemSearch };
