import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dimensions } from 'react-native';

const NormaDetalleScreen = ({ navigation, route }) => {
  const { details } = route.params;
  const { width } = Dimensions.get('window');

  const renderField = (label, value, isCollapsible = false, collapsed = true, onToggle = () => {}, showLabel = true) => {
    if (value) {
      if (typeof value === 'string' && value.trim() === '') return null;
  
      const isHtml = value.includes('<') && value.includes('>'); // Detecta si el valor es HTML
  
      return (
        <View style={isCollapsible ? styles.contenedorConLinea : styles.contenedor}>
          {isCollapsible ? (
            <>
              <TouchableOpacity style={styles.desplegable} onPress={onToggle}>
                {showLabel && <Text style={styles.titulo}>{label}:</Text>}
                <AntDesign name={collapsed ? "downcircleo" : "upcircleo"} size={20} color="#FF893E" />
              </TouchableOpacity>
              <Collapsible collapsed={collapsed} style={styles.fondo}>
                {isHtml ? (
                  <RenderHtml contentWidth={Dimensions.get('window').width} source={{ html: value }} />
                ) : (
                  <Text style={styles.informacion}>{value}</Text>
                )}
              </Collapsible>
            </>
          ) : (
            <>
              {showLabel && <Text style={styles.titulo}>{label}:</Text>}
              {isHtml ? (
                <RenderHtml contentWidth={Dimensions.get('window').width} source={{ html: value }} />
              ) : (
                <Text style={styles.informacion}>{value}</Text>
              )}
            </>
          )}
        </View>
      );
    }
    return null;
  };
  

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

  const baseUrl = 'http://faba.org.ar/';
  
  const renderPdfButton = (pdfPartialUrl) => {
    if (pdfPartialUrl && pdfPartialUrl.trim()) {  // Verifica que pdfPartialUrl no sea undefined, null, o una cadena vacía
      const filePath = pdfPartialUrl.replace('\\FABAWEBCL1', '');
      const fullUrl = `${baseUrl}${filePath.replace(/\\/g, '/')}`;

      return (
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(fullUrl)}>
          <Text style={styles.buttonText}>Abrir PDF</Text>
        </TouchableOpacity>
      );
    } else {
      return <Text>No hay PDF disponible</Text>; // Mensaje cuando no hay un PDF válido
    }
  };

  useEffect(() => {
    if (details?.sigla) {
      navigation.setOptions({ title: details.sigla });
    }
  }, [details?.sigla]);

  return (
    <ScrollView style={styles.container}>

      {renderField('', details.nombre, false, true, () => { }, false)}
      {renderField('Código', details.codigomutual)}
      {renderField('Fecha de actualización', details.fechaactualizacion)}
      {renderField('Credencial Digital', details.credencialdigital)}
      {renderField('Credencial Plástica', details.credencialplastica)}
      {renderField('DNI', details.dni)}

      {renderField('Formato de orden', details.formatoOrden, true, collapsedSections.formatoOrden, () => toggleSection('formatoOrden'))}

      {renderField('APB', details.apb, true, collapsedSections.apb, () => toggleSection('apb'))}

      {renderField('Copago', details.copago)}

      {renderField('Planes', details.planes, true, collapsedSections.planes, () => toggleSection('planes'))}

      {renderField('AOL', details.aol)}
      
      {renderField('Fecha de publicación', details.fechapublicacion)}

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.pdfNorma}>{renderPdfButton(details.pdf)}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

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
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF893E',
    paddingVertical: 10,
  },
  valorAPB: {
    fontSize: 16,
    color: 'grey',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF893E',
  },

  floatingButton: {
    marginTop: 20,
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

export default NormaDetalleScreen;
