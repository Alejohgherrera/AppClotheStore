import AsyncStorage from '@react-native-async-storage/async-storage';
import { serializeFilterMap } from '../data/filters';

export async function loadStoredFilters(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return {
      value: raw ? JSON.parse(raw) : null,
      failed: false,
    };
  } catch (error) {
    console.warn('No se pudieron cargar los filtros guardados:', error);
    return {
      value: null,
      failed: true,
    };
  }
}

export async function saveStoredFilters(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(serializeFilterMap(value)));
  } catch (error) {
    console.warn('No se pudieron guardar los filtros:', error);
  }
}
