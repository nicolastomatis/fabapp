import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracionNotificacionesScreen = ({ navigation }) => {
  const [filters, setFilters] = useState({
    comunicaciones: true,
    novedades: true,
    gacetillas: true,
    generales: true,
    otras: true,
  });

  useEffect(() => {
    const cargarFiltros = async () => {
      const savedFilters = await AsyncStorage.getItem('@filtros_notificaciones');
      if (savedFilters) {
        setFilters(JSON.parse(savedFilters));
      }
    };
    cargarFiltros();
  }, []);

  const guardarFiltros = async () => {
    try {
      await AsyncStorage.setItem('@filtros_notificaciones', JSON.stringify(filters));
      Alert.alert('Configuración guardada', 'Tus preferencias han sido guardadas.');
      // Notificar a la pantalla de notificaciones para que recargue los datos
      navigation.navigate('Notificaciones'); // O usa un mecanismo para actualizar la pantalla de notificaciones
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar la configuración.');
    }
  };

  const toggleSwitch = (tipo) => {
    setFilters({ ...filters, [tipo]: !filters[tipo] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <Text>Comunicaciones</Text>
        <Switch
          value={filters.comunicaciones}
          onValueChange={() => toggleSwitch('comunicaciones')}
        />
      </View>
      <View style={styles.filterRow}>
        <Text>Novedades</Text>
        <Switch
          value={filters.novedades}
          onValueChange={() => toggleSwitch('novedades')}
        />
      </View>
      <View style={styles.filterRow}>
        <Text>Gacetillas</Text>
        <Switch
          value={filters.gacetillas}
          onValueChange={() => toggleSwitch('gacetillas')}
        />
      </View>
      <View style={styles.filterRow}>
        <Text>Generales</Text>
        <Switch
          value={filters.generales}
          onValueChange={() => toggleSwitch('generales')}
        />
      </View>
      <View style={styles.filterRow}>
        <Text>Otras</Text>
        <Switch
          value={filters.otras}
          onValueChange={() => toggleSwitch('otras')}
        />
      </View>
      <Button title="Guardar Configuración" onPress={guardarFiltros} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default ConfiguracionNotificacionesScreen;
