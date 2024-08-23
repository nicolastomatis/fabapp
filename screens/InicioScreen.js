import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/InicioStyles'; // Ruta de acuerdo a tu estructura de carpetas

const InicioScreen = ({ navigation }) => {
  const [mutuales, setMutuales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMutualesData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('@session_data');
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);

          if (parsedData.token && parsedData.usuario && parsedData.mutuales) {
            // Limitar a los primeros 8 elementos
            const topMutuales = parsedData.mutuales.slice(0, 9);
            setMutuales(topMutuales);
          } else {
            setError('Datos de sesión incompletos');
          }
        } else {
          setError('No se encontraron datos de sesión');
        }
      } catch (error) {
        console.error('Error al cargar los datos de sesión:', error);
        setError('Error al recuperar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchMutualesData();
  }, []);

  const handlePress = async (codigomutual) => {
    console.log("Pressed codigomutual:", codigomutual); // Para verificar que el código se esté pasando correctamente

    if (!codigomutual) {
      setError('No se ha seleccionado ninguna mutual');
      return;
    }

    setLoading(true);

    try {
      const sessionData = await AsyncStorage.getItem('@session_data');
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        const token = parsedData.token;
        const user = parsedData.usuario.cod;

        console.log("Token:", token, "User:", user, "Mutual:", codigomutual); // Verifica los valores antes de hacer la solicitud

        const response = await axios.post('http://10.10.0.49:3000/TraerNormaMutual', {
          token,
          user,
          mutual: codigomutual
        });

        console.log("Response:", response.data);

        const detalles = response.data.response[0];
        navigation.navigate('NormaDetalle', { details: detalles });

      } else {
        setError('No se encontraron datos de sesión');
      }
    } catch (error) {
      console.error('Error al solicitar detalles:', error);
      setError('Error al solicitar detalles');
    } finally {
      setLoading(false);
    }
  };

  // Función para truncar el texto
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.facturacionButton}
          onPress={() => navigation.navigate('Facturacion')}
        >
          <ImageBackground
            source={require('../assets/images/fondoBoton.jpg')}
            style={styles.backgroundImage}
          >
            <Text style={styles.buttonText}>Cierre de{"\n"}facturación</Text>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.subtitleSection}>Normas de Obras Sociales</Text>

          <TouchableOpacity style={[styles.verMasButtonItem]} onPress={() => navigation.navigate('NormasObrasSociales')}>
            <Text style={styles.textoButtonItem}>ver todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItems}>
          <FlatList
            data={mutuales}
            keyExtractor={(item) => item.codigomutual.toString()}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress(item.codigomutual)}
              >
                <Text style={styles.siglas}>{truncateText(item.sigla, 10)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = '25%';

export default InicioScreen;
