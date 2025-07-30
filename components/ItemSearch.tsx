import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const ItemSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query: string) => {
    // dispatch(setSearchWord(query));
    setSearchQuery(query);
  };
  return (
    <View className="p-5" style={styles.container}>
      <Input
        className="text-center border-border-100"
        style={styles.inputContainer}
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
  );
};

const styles = StyleSheet.create({
  action: { margin: 0 },
  container: { marginVertical: 6, flexDirection: "row" },
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
