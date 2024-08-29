// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cargarFiltros = async () => {
  try {
    const savedFilters = await AsyncStorage.getItem('@filtros_notificaciones');
    return savedFilters ? JSON.parse(savedFilters) : null;
  } catch (error) {
    console.error('Error loading filters:', error);
    return null;
  }
};

export const guardarFiltros = async (filters) => {
  try {
    await AsyncStorage.setItem('@filtros_notificaciones', JSON.stringify(filters));
    return true;
  } catch (error) {
    console.error('Error saving filters:', error);
    return false;
  }
};
