import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';

const NormaDetalleScreen = ({ navigation, route }) => {
  const { details } = route.params;

  // Verificación para asegurarse de que 'details' está definido
  if (!details || typeof details !== 'object') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error al cargar los detalles. Por favor, inténtelo nuevamente.</Text>
      </SafeAreaView>
    );
  }

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
  
    const renderValue = () => {
      if (typeof value === 'string') {
        if (value.toUpperCase() === 'SI') {
          return <AntDesign name="checkcircleo" size={25} color="green" />;
        } else if (value.toUpperCase() === 'NO') {
          return <AntDesign name="closecircleo" size={25} color="red" />;
        }
      }
    
      return Array.isArray(value) ? value.map((item, index) => (
        <View key={index} style={styles.itemFormatoOrdenes}>
        <View style={styles.itemFormatoOrdenesTituloYAcepta}>
          <Text style={styles.itemTitle}>{item.tipo}:</Text>
          {/* Aquí se aplica la misma lógica para item.acepta */}
          {typeof item.acepta === 'string' && item.acepta.toUpperCase() === 'SÍ' ? (
            <AntDesign name="checkcircleo" size={25} color="green" />
          ) : typeof item.acepta === 'string' && item.acepta.toUpperCase() === 'NO' ? (
            <AntDesign name="closecircleo" size={25} color="red" />
          ) : (
            <Text style={styles.itemText}>{stripHtmlTags(item.acepta)}</Text>
          )}          
          
        </View>   
        
        <View style={styles.itemFormatoOrdenesTituloYAcepta}>
        <Text style={styles.itemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur rhoncus purus, sed commodo turpis semper id.</Text>
        </View>
          
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
    <SafeAreaView style={styles.Safecontainer}>
      <ScrollView style={styles.container}>
        {renderField('', details.nombre, false, true, () => {}, false)}
        
        <View style={styles.contenedorConLinea}>
          <Text style={styles.descripcion}>Documentación que debe presentar el afiliado para su atención en el laboratorio</Text>
        </View>

        {renderField('Código', details.codigomutual)}
        {renderField('Fecha de act.', details.fechaactualizacion)}
        {renderField('Credencial Digital', details.credencialdigital)}
        {renderField('Credencial Plástica', details.credencialplastica)}
        {renderField('DNI', details.dni)}

        {renderField('Formato de orden', details.tipoOrden, true, collapsedSections.tipoOrden, () => toggleSection('tipoOrden'))}

        {renderField('APB', details.apb, true, collapsedSections.apb, () => toggleSection('apb'))}

        {renderField('Copago', details.copago)}

        {renderField('Planes', details.planes, true, collapsedSections.planes, () => toggleSection('planes'))}

        {renderField('AOL', details.aol)}

        {renderField('Fecha de pub.', details.fechapublicacion)}

        {renderPdfButton(details.pdf)}
      </ScrollView>
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
    padding:20,
  },
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
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
  itemFormatoOrdenes: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom:20,
  },
  itemFormatoOrdenesTituloYAcepta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:0,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'grey',
    marginBottom:10,
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 20,
    padding:20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0671B8',
  },
});

export default NormaDetalleScreen;
