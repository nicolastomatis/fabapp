import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomModal from '../components/CustomModal'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const NotificacionesScreen = ({ route, navigation }) => {
  const [novedades, setNovedades] = useState([]);
  const [filteredNovedades, setFilteredNovedades] = useState([]);
  const [filters, setFilters] = useState({
    comunicaciones: true,
    novedades: true,
    gacetillas: true,
    generales: true,
    otras: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionNotificacionesScreen')}>
          <Image source={require('../assets/icons/setting.png')} style={styles.icon}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const obtenerFiltros = async () => {
      const savedFilters = await AsyncStorage.getItem('@filtros_notificaciones');
      if (savedFilters) {
        setFilters(JSON.parse(savedFilters));
      }
    };
    obtenerFiltros();
  }, []);

  useEffect(() => {
    if (route.params?.filtrosActualizados) {
      setFilters(route.params.filtrosActualizados);
    }
  }, [route.params?.filtrosActualizados]);

  const obtenerNovedades = async () => {
    try {
        console.log('Obteniendo novedades...');
        const sessionData = await AsyncStorage.getItem('@session_data');

        if (sessionData) {
            const { token, usuario } = JSON.parse(sessionData);

            if (!token || !usuario || !usuario.cod) {
                setModalTitle('Error');
                setModalMessage('Datos de sesión incompletos');
                setModalVisible(true);
                return;
            }

            // Formatear los datos como una cadena de consulta
            const formData = new URLSearchParams();
            formData.append('token', token);
            formData.append('user', usuario.cod);

            // Reemplaza el siguiente URL con el endpoint de Firebase Functions
            const firebaseFunctionUrl = 'https://us-central1-fabapp-b7caa.cloudfunctions.net/traerNovedades';

            const response = await axios.post(firebaseFunctionUrl, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log('Respuesta del servidor:', response.data);

            const data = response.data;

            // Ajusta el acceso a los datos según la estructura de la respuesta
            if (data.response && Array.isArray(data.response)) {
                setNovedades(data.response);
            } else {
                setModalTitle('Error');
                setModalMessage('No se encontraron novedades');
                setModalVisible(true);
            }
        } else {
            setModalTitle('Error');
            setModalMessage('No se encontraron datos de sesión');
            setModalVisible(true);
        }
    } catch (error) {
        console.error('Error al obtener las novedades:', error);
        setModalTitle('Error');
        setModalMessage('Error al obtener las novedades');
        setModalVisible(true);
    }
};


  const aplicarFiltros = (novedades, filtros) => {
    console.log('Aplicando filtros:', filtros);
    const novedadesFiltradas = novedades.filter(novedad => {
      if (novedad.tiponovedad === 'COM - Comunicaciones' && !filtros.comunicaciones) return false;
      if (novedad.tiponovedad === 'NOV - Novedades' && !filtros.novedades) return false;
      if (novedad.tiponovedad === 'GAC - Gacetillas' && !filtros.gacetillas) return false;
      if (novedad.tiponovedad === 'GEN - Generales' && !filtros.generales) return false;
      if (novedad.tiponovedad === 'Otras' && !filtros.otras) return false;
      return true;
    });
    setFilteredNovedades(novedadesFiltradas);
  };

  useEffect(() => {
    obtenerNovedades();
  }, []);

  useEffect(() => {
    console.log('Aplicando filtros a novedades...');
    aplicarFiltros(novedades, filters);
  }, [filters, novedades]);

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
    <SafeAreaView style={styles.Safecontainer}>
      <FlatList  style={styles.container}
        data={filteredNovedades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificacion, { backgroundColor: getBackgroundColor(item.tiponovedad) }]}
            onPress={() => {
              // Aquí defines el enlace que deseas abrir
              const link = 'http://faba.org.ar/novedades.asp'; // Cambia esta URL por el enlace deseado
              Linking.openURL(link).catch(err => console.error("Failed to open URL:", err));
            }}
          >
            <View style={styles.row}>
              <Text style={styles.nombre}>{extractCodigo(item.tiponovedad)}</Text>
              <Text style={styles.nombre}>{item.nronovedad}</Text>
              <View style={styles.obrasocialContainer}>
                <Text style={styles.obrasocial} numberOfLines={1} ellipsizeMode='tail'>{item.obrasocial}</Text>
              </View>
            </View>
            <Text style={styles.asunto}>{item.asunto}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay novedades disponibles</Text>}
      />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Safecontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  notificacion: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'white',
    marginRight: 15,
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
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
    tintColor: '#009D96',
  },
});

export default NotificacionesScreen;
