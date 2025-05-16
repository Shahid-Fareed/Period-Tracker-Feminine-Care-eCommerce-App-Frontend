import AsyncStorage from "@react-native-async-storage/async-storage";

export default saveToAsyncStorageCredentials = async (
  storageName,
  dataToInsert
) => {
  await AsyncStorage.setItem(storageName, JSON.stringify(dataToInsert));
};
