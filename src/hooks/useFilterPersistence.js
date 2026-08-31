import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadStoredFilters(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.warn('No se pudieron cargar los filtros guardados:', error);
    return null;
  }
}

export async function saveStoredFilters(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('No se pudieron guardar los filtros:', error);
  }
}
