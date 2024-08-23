import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';

const NormaDetalleScreen = ({ navigation, route }) => {
  const { details } = route.params;

  const renderField = (
    label,
    value,
    isCollapsible = false,
    collapsed = true,
    onToggle = () => {},
    showLabel = true
  ) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    return (
      <View style={isCollapsible ? styles.contenedorConLinea : styles.contenedor}>
        {isCollapsible ? (
          <>
            <TouchableOpacity style={styles.desplegable} onPress={onToggle}>
              {showLabel && <Text style={styles.titulo}>{label}:</Text>}
              <AntDesign name={collapsed ? "downcircleo" : "upcircleo"} size={25} color="#FF893E" marginTop={10} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} style={styles.fondo}>
              <Text style={styles.informacionHTML}>{stripHtmlTags(value)}</Text>
            </Collapsible>
          </>
        ) : (
          <>
            {showLabel && <Text style={styles.titulo}>{label}:</Text>}
            <Text style={styles.informacion}>{stripHtmlTags(value)}</Text>
          </>
        )}
      </View>
    );
  };

  const stripHtmlTags = (html) => {
    // Reemplaza las etiquetas <br> por saltos de línea
    const textWithLineBreaks = html.replace(/<br\s*\/?>/gi, '\n');
    // Elimina las demás etiquetas HTML
    return textWithLineBreaks.replace(/<[^>]*>?/gm, '');
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
    if (pdfPartialUrl && pdfPartialUrl.trim()) {
      const filePath = pdfPartialUrl.replace('\\FABAWEBCL1', '');
      const fullUrl = `${baseUrl}${filePath.replace(/\\/g, '/')}`;

      return (
        <TouchableOpacity style={styles.floatingButton} onPress={() => Linking.openURL(fullUrl)}>
          <Text style={styles.buttonText}>Abrir PDF</Text>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.floatingButton}>No hay PDF disponible</Text>;
    }
  };

  useEffect(() => {
    if (details?.sigla) {
      navigation.setOptions({ title: details.sigla });
    }
  }, [details?.sigla]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
      {renderField('', details.nombre, false, true, () => {}, false)}
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

      {renderPdfButton(details.pdf)}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  informacion: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF893E',
    paddingVertical: 10,
  },
  informacionHTML: {
    fontSize: 18,
    color: 'grey',
    paddingVertical: 10,
    textAlign: 'justify',
  },
  floatingButton: {
    marginTop: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#00A8A2',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NormaDetalleScreen;
