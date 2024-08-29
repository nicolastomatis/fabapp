import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const NormasObrasSocialesScreen = ({ navigation }) => {
  const [mutuales, setMutuales] = useState([]);
  const [filteredMutuales, setFilteredMutuales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMutualesData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('@session_data');
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);

          if (parsedData.token && parsedData.usuario && parsedData.mutuales) {
            const mutuales = parsedData.mutuales;
            console.log('Mutuales:', mutuales); // Verifica los datos
            setMutuales(mutuales);
            setFilteredMutuales(mutuales); // Inicialmente, muestra todos los datos
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

  useEffect(() => {
    if (searchQuery) {
      const filteredData = mutuales.filter(item => 
        item.sigla.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.codigomutual.toString().includes(searchQuery)
      );
      setFilteredMutuales(filteredData);
    } else {
      setFilteredMutuales(mutuales);
    }
  }, [searchQuery, mutuales]);

  const handlePress = async (codigomutual) => {
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
  
        console.log("Token:", token, "User:", user, "Mutual:", codigomutual);
  
        const formData = new URLSearchParams();
        formData.append('token', token);
        formData.append('user', user);
        formData.append('mutual', codigomutual);
  
        const response = await axios.post('http://www.fabawsmobile.faba.org.ar/Service1.asmx/TraerNormaMutual', formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
  
        console.log("Response:", response.data);
  
        const detalles = response.data.response.detallesNorma;
        console.log("Detalles recibidos:", detalles);
  
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
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF893E" />
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  // Función para truncar el texto
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar por sigla o código"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredMutuales}
          keyExtractor={(item) => item.codigomutual ? item.codigomutual.toString() : Math.random().toString()}
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
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = '30%';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#009D96',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  list: {
    justifyContent: 'space-between',
    gap: 20,
  },
  item: {
    width: ITEM_WIDTH,
    marginRight: 17,
    backgroundColor: '#009D96',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 10,
  },
  siglas: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  codigo: {
    fontSize: 6,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#FF893E',
    textAlign: 'center',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NormasObrasSocialesScreen;
