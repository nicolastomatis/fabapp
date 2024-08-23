import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';

const NotificacionesScreen = ({ navigation }) => {
  const [novedades, setNovedades] = useState([]);
  const [filteredNovedades, setFilteredNovedades] = useState([]);
  const [filters, setFilters] = useState({
    comunicaciones: true,
    novedades: true,
    gacetillas: true,
    generales: true,
    otras: true,
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionNotificacionesScreen')}>
          <AntDesign name="setting" size={40} color="#00A8A2" style={{ marginRight: 20 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const obtenerNovedades = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('@session_data');
      if (sessionData) {
        const { token, usuario } = JSON.parse(sessionData);

        if (!token || !usuario || !usuario.cod) {
          throw new Error('Datos de sesión incompletos');
        }

        const res = await fetch('http://10.10.0.49:3000/TraerNovedades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, user: usuario.cod })
        });

        if (!res.ok) {
          throw new Error(`Error en la respuesta del servidor: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Datos obtenidos:', data);

        if (data.response && Array.isArray(data.response)) {
          setNovedades(data.response);
        } else {
          Alert.alert('Error', 'No se encontraron novedades');
        }
      } else {
        Alert.alert('Error', 'No se encontraron datos de sesión');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Error al obtener las novedades');
    }
  };

  const aplicarFiltros = (novedades, filtros) => {
    const novedadesFiltradas = novedades.filter(novedad => {
      if (novedad.tiponovedad === 'COM - Comunicaciones' && !filtros.comunicaciones) return false;
      if (novedad.tiponovedad === 'NOV - Novedades' && !filtros.novedades) return false;
      if (novedad.tiponovedad === 'GAC - Gacetillas' && !filtros.gacetillas) return false;
      if (novedad.tiponovedad === 'GEN - Generales' && !filtros.generales) return false;
      if (novedad.tiponovedad === 'Otras' && !filtros.otras) return false;
      return true;
    });
    console.log('Novedades filtradas:', novedadesFiltradas); // Log para verificar
    setFilteredNovedades(novedadesFiltradas);
  };

  useEffect(() => {
    const cargarFiltros = async () => {
      const savedFilters = await AsyncStorage.getItem('@filtros_notificaciones');
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        setFilters(parsedFilters);
      }
    };

    obtenerNovedades();
    cargarFiltros();
  }, []);

  useEffect(() => {
    aplicarFiltros(novedades, filters);
  }, [filters, novedades]);

  useEffect(() => {
    const guardarFiltros = async () => {
      try {
        await AsyncStorage.setItem('@filtros_notificaciones', JSON.stringify(filters));
      } catch (error) {
        console.error('Error al guardar filtros:', error);
      }
    };

    guardarFiltros();
  }, [filters]);

  // Función para extraer la parte antes del guion
  const extractCodigo = (tiponovedad) => {
    return tiponovedad.split(' - ')[0]; // Esto devolverá "COM", "NOV", etc.
  };

  const getBackgroundColor = (tiponovedad) => {
    switch (tiponovedad) {
      case 'COM - Comunicaciones':
        return '#FB9E70'; // Rojo claro
      case 'NOV - Novedades':
        return '#A27BF9'; // Verde claro
      case 'GAC - Gacetillas':
        return '#62BFB6'; // Azul claro
      case 'GEN - Generales':
        return '#6998FA'; // Amarillo claro
      case 'Otras':
        return '#FF7093'; // Gris
      default:
        return '#CBCBCB'; // Gris por defecto
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredNovedades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.notificacion, { backgroundColor: getBackgroundColor(item.tiponovedad) }]}>
            <View style={styles.row}>
              <Text style={styles.nombre}>{extractCodigo(item.tiponovedad)}</Text>
              <Text style={styles.nombre}>{item.nronovedad}</Text>
              <View style={styles.obrasocialContainer}>
                <Text style={styles.obrasocial} numberOfLines={1} ellipsizeMode='tail'>{item.obrasocial}</Text>
              </View>
            </View>
            <Text style={styles.asunto}>{item.asunto}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay novedades disponibles</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  notificacion: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    marginRight: 5,
  },
  obrasocialContainer: {
    flex: 1,
    marginRight: 5,
  },
  obrasocial: {
    fontSize: 18,
    color: 'white',
    flexShrink: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  asunto: {
    fontSize: 16,
    color: 'white',
    width: '100%',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default NotificacionesScreen;
