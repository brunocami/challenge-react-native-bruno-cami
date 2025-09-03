import AsyncStorage from '@react-native-async-storage/async-storage';

// Funciones para el manejo de datos persistentes
export async function saveString(key: string, value: string) {
  try { await AsyncStorage.setItem(key, value); } catch {}
}

export async function loadString(key: string): Promise<string | null> {
  try { return await AsyncStorage.getItem(key); } catch { return null; }
}

export async function removeKey(key: string) {
  try { await AsyncStorage.removeItem(key); } catch {}
}
