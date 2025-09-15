import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  getItem: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    return await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    return await AsyncStorage.removeItem(key);
  },
};
export default storage;