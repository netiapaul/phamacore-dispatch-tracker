import * as SecureStore from "expo-secure-store";

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    return alert("No values stored under that key.");
  }

  return result;
}

export { getValueFor };
