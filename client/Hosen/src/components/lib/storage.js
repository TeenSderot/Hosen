import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getString(key){
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function setString(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export async function remove(key){
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignore
  }
}
