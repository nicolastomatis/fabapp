import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, SafeAreaView, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../styles/InicioStyles'; // Ruta de acuerdo a tu estructura de carpetas


const data = [
  { id: '1', nombre: 'Obra Social del Personal de entidades Deportivas y Civiles', siglas: 'OSPEDYC', codigo: '2685', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'si, solo prácticas COVID', grillada: 'si', preimpresa: 'Si, enviar copia a atención al bioquímico para poder ser facturada', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'A00, A01', fechaActualizacion:'13/04/2024'},
  { id: '2', nombre: 'Obra Social de Petroleros', siglas: 'OSPE', codigo: '918', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'no', grillada: 'si', preimpresa: 'Si, consultar norma', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'B25, B58', fechaActualizacion:'01/07/2024'},
  { id: '3', nombre: 'Obra Social del quimicos y del carton', siglas: 'OSPEQC', codigo: '875', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'bronce, plata, oro', fechaActualizacion:'01/06/2024'},
  { id: '4', nombre: 'Obra Social de los panaderos', siglas: 'OSPAN', codigo: '75', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'sin planes', fechaActualizacion:'01/08/2024'},
  { id: '5', nombre: 'Obra Social de Empleados Bancarios', siglas: 'OSEB', codigo: '1234', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'si, solo prácticas COVID', grillada: 'si', preimpresa: 'Si, enviar copia a atención al bioquímico para poder ser facturada', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'A00, A01', fechaActualizacion:'13/04/2024'},
  { id: '6', nombre: 'Obra Social de Trabajadores de la Construcción', siglas: 'OSTC', codigo: '5678', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'no', grillada: 'si', preimpresa: 'Si, consultar norma', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'B25, B58', fechaActualizacion:'01/07/2024'},
  { id: '7', nombre: 'Obra Social de Maestros y Profesores', siglas: 'OSMP', codigo: '9101', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'bronce, plata, oro', fechaActualizacion:'01/06/2024'},
  { id: '8', nombre: 'Obra Social de Metalúrgicos', siglas: 'OSMET', codigo: '1121', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'sin planes', fechaActualizacion:'01/08/2024'},
  { id: '9', nombre: 'Ver más', siglas: '', isButton: true }, // El último elemento es el botón "Ver más"
];

export default function InicioScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <AntDesign name="user" size={40} color="#00A8A2" style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => {
    if (item.isButton) {
      return (
        <TouchableOpacity
          style={[styles.item, styles.verMasButtonItem]}
          onPress={() => navigation.navigate('NormasObrasSociales')}
        >
          <AntDesign name="pluscircle" size={30} color="white" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('NormaDetalle', {
          nombre: item.nombre,
          siglas: item.siglas,
          codigo: item.codigo,
          credencial: item.credencial,
          DNI: item.DNI,
          digital: item.digital,
          electronica: item.nombre,
          grillada: item.electronica,
          preimpresa: item.preimpresa,
          APB: item.APB,
          copagos: item.copagos,
          ingresoAOL: item.ingresoAOL,
          planes: item.planes,
          fechaActualizacion: item.fechaActualizacion,
        })}
      >
        <Text style={styles.siglas}>{item.siglas}</Text>
        <Text style={styles.codigo}>{item.codigo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
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
        <Text style={styles.subtitleSection}>Normas de obras sociales</Text>
      </View>

      <View style={styles.listItems}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.list}
          scrollEnabled={false} // Deshabilita el scroll
        />
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}