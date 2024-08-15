import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function NormaDetalleScreen({ route, navigation }) {
  const { nombre, siglas, codigo, credencial, DNI, digital, electronica, grillada, preimpresa, APB, copagos, ingresoAOL, planes, fechaActualizacion } = route.params;

  const [collapsedSections, setCollapsedSections] = useState({
    apb: true,
    formatoOrden: true,
    planes: true,
  });

  const toggleSection = (section) => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handlePress = () => {
    // Acción que deseas realizar cuando se presione el botón
    alert('Botón flotante presionado');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: siglas, // Establece el título del encabezado
    });
  }, [navigation, siglas]);

  return (

    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}> {nombre}</Text>
        </View>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Código:</Text>
          <Text style={styles.informacion}> {codigo}</Text>
        </View>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Fecha:</Text>
          <Text style={styles.informacion}> {fechaActualizacion}</Text>
        </View>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Credencial:</Text>
          <Text style={styles.informacion}> {credencial}</Text>
        </View>

        <View style={styles.contenedorConLinea}>
          <TouchableOpacity style={styles.desplegable} onPress={() => toggleSection('apb')}>
            <Text style={styles.titulo}>APB:</Text>
            <AntDesign name="downcircleo" size={20} color="#FF893E" />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.apb}>
            <View>
              <Text style={styles.valorAPB}>{APB}</Text>
            </View>
          </Collapsible>
        </View>
        <View style={styles.contenedorConLinea}>
          <TouchableOpacity style={styles.desplegable} onPress={() => toggleSection('formatoOrden')}>
            <Text style={styles.titulo}>Formato de Orden:</Text>
            <AntDesign name="downcircleo" size={20} color="#FF893E" />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.formatoOrden} style={styles.fondo}>
            <View style={styles.contenedorSinLinea}>
              <Text style={styles.subtitulo}>Orden digital:</Text>
              <Text style={styles.informacion}>{digital}</Text>
            </View>
            <View style={styles.contenedorSinLinea}>
              <Text style={styles.subtitulo}>Orden Electrónica:</Text>
              <Text style={styles.informacion}>{electronica}</Text>
            </View>
            <View style={styles.contenedorSinLinea}>
              <Text style={styles.subtitulo}>Orden Grillada:</Text>
              <Text style={styles.informacion}>{grillada}</Text>
            </View>
            <View style={styles.contenedorSinLinea}>
              <Text style={styles.subtitulo}>Orden Pre-Impresa:</Text>
              <Text style={styles.informacion}>{preimpresa}</Text>
            </View>
          </Collapsible>
        </View>
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>DNI:</Text>
          <Text style={styles.informacion}> {DNI}</Text>
        </View>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Ingreso por AOL:</Text>
          <Text style={styles.informacion}> {ingresoAOL}</Text>
        </View>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Copago:</Text>
          <Text style={styles.informacion}> {copagos}</Text>
        </View>
        <View style={styles.contenedorConLinea}>
          <TouchableOpacity style={styles.desplegable} onPress={() => toggleSection('planes')}>
            <Text style={styles.titulo}>Planes:</Text>
            <AntDesign name="downcircleo" size={20} color="#FF893E" />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.planes}>
            <View style={styles.contenedorSinLinea}>
              <Text style={styles.informacion}>{planes}</Text>
            </View>
          </Collapsible>
        </View>
      </ScrollView >
      <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
        <Text style={styles.pdfNorma}>Ver Norma</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  desplegable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 10,
  },
  contenedorConLinea: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'grey',
    paddingVertical: 10,
  },
  

  subtitulo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'grey',
    paddingVertical: 10,
  },

  informacion: {
    fontSize: 16,
    color: '#FF893E',
    paddingVertical: 10,
  },
  valorAPB: {
    fontSize: 16,
    color: 'grey',
    padding:10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF893E',
  },

  floatingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    bottom: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#00A8A2',
  },
  pdfNorma: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
