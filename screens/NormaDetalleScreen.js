import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, SafeAreaView, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';

const NormaDetalleScreen = ({ navigation, route }) => {
  const { details } = route.params;

  // Función para limpiar etiquetas HTML
  const stripHtmlTags = (html) => {
    if (typeof html !== 'string') {
      console.warn('Valor no es una cadena:', html);
      return ''; // Si no es una cadena, retorna una cadena vacía
    }

    const textWithLineBreaks = html.replace(/<br\s*\/?>/gi, '\n');
    return textWithLineBreaks.replace(/<[^>]*>?/gm, '');
  };

  const renderField = (
    label,
    value,
    isCollapsible = false,
    collapsed = true,
    onToggle = () => {},
    showLabel = true
  ) => {
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }
  
    // Función para renderizar las imágenes según el valor
    const renderValue = () => {
      if (typeof value === 'string') {
        if (value.toUpperCase() === 'SI') {
          return <Image source={require('../assets/icons/si.png')} style={styles.icon} />;

        } else if (value.toUpperCase() === 'NO') {
          return <Image source={require('../assets/icons/no.png')} style={styles.icon} />;

        }
      }
      // Si no es "SI" o "NO", mostrar el valor normal
      return Array.isArray(value) ? value.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.nombre}:</Text>
          <Text style={styles.itemText}>{stripHtmlTags(item.texto)}</Text>
        </View>
      )) : (typeof value === 'object')
        ? JSON.stringify(value)
        : stripHtmlTags(value);
    };
  
    return (
      <View style={isCollapsible ? styles.contenedorConLinea : styles.contenedor}>
        {isCollapsible ? (
          <>
            <TouchableOpacity style={styles.desplegable} onPress={onToggle}>
              {showLabel && <Text style={styles.titulo}>{label}:</Text>}
              <AntDesign name={collapsed ? "downcircleo" : "upcircleo"} size={25} color="#FF893E" marginTop={10} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} style={styles.fondo}>
              {Array.isArray(value) ? renderValue() : <Text style={styles.informacionHTML}>{renderValue()}</Text>}
            </Collapsible>
          </>
        ) : (
          <>
            {showLabel && <Text style={styles.titulo}>{label}:</Text>}
            {Array.isArray(value) ? renderValue() : <Text style={styles.informacion}>{renderValue()}</Text>}
          </>
        )}
      </View>
    );
  };
  
  
  

  // Función para renderizar el botón PDF
  const renderPdfButton = (pdfPartialUrl) => {
    if (pdfPartialUrl && pdfPartialUrl.trim()) {
      const filePath = pdfPartialUrl.replace('\\FABAWEBCL1', '');
      const fullUrl = `http://faba.org.ar${filePath.replace(/\\/g, '/')}`;

      return (
        <TouchableOpacity style={styles.floatingButton} onPress={() => Linking.openURL(fullUrl)}>
          <Text style={styles.buttonText}>Abrir PDF</Text>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.floatingButton}>No hay PDF disponible</Text>;
    }
  };

  const [collapsedSections, setCollapsedSections] = useState({
    apb: true,
    tipoOrden: true,
    planes: true,
  });

  const toggleSection = (section) => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
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
        
        <View style={styles.contenedorConLinea}>
        <Text style={styles.descripcion}>Documentación que debe presentar el afiliado para su atención en el laboratorio</Text>
        </View>

        {renderField('Código', details.codigomutual)}
        {renderField('Fecha de actualización', details.fechaactualizacion)}
        {renderField('Credencial Digital', details.credencialdigital)}
        {renderField('Credencial Plástica', details.credencialplastica)}
        {renderField('DNI', details.dni)}

        {renderField('Formato de orden', details.tipoOrden, true, collapsedSections.tipoOrden, () => toggleSection('tipoOrden'))}

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
    alignItems:'center',
    paddingBottom: 10,
    marginBottom: 10,
    height:50,
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
    marginBottom: 10,
  },
  floatingButton: {
    width: 'auto',
    marginTop: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#00A8A2',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 0,
    flexDirection: 'column',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'grey',
    marginBottom:10,
    width:'100%',
  },
  itemText: {
    fontSize: 16,
    color: 'grey',
    marginBottom:10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  descripcion: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0671B8',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0671B8',
    textAlign: 'center',
  },
});

export default NormaDetalleScreen;
