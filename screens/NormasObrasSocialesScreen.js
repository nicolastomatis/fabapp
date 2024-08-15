import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Dimensions, SafeAreaView } from 'react-native';

const data = [
  { id: '1', nombre: 'Obra Social del Personal de entidades Deportivas y Civiles', siglas: 'OSPEDYC', codigo: '2685', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'si, solo prácticas COVID', grillada: 'si', preimpresa: 'Si, enviar copia a atención al bioquímico para poder ser facturada', APB: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas nunc nec risus tempor, sit amet imperdiet erat bibendum. Mauris facilisis vitae nisi eu elementum. Aenean varius rutrum arcu nec iaculis. Aenean sem leo, lacinia vitae urna non, blandit feugiat neque. Morbi a risus quis magna interdum iaculis vel eget est. Maecenas sodales ligula sodales pellentesque scelerisque. Pellentesque ut mi nec metus blandit pellentesque non in massa. Donec et auctor turpis, eget finibus ante. Duis dictum viverra mauris non vehicula. Pellentesque sit amet mi blandit, vehicula dui at, volutpat quam. Fusce euismod leo eu lacus iaculis, at vehicula quam pretium. Morbi consequat interdum lacinia. Aenean sed turpis vitae libero tincidunt tincidunt. Sed a bibendum risus, eget congue augue. Phasellus a maximus urna, vestibulum molestie eros. In eu vulputate nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas nunc nec risus tempor, sit amet imperdiet erat bibendum. Mauris facilisis vitae nisi eu elementum. Aenean varius rutrum arcu nec iaculis. Aenean sem leo, lacinia vitae urna non, blandit feugiat neque. Morbi a risus quis magna interdum iaculis vel eget est. Maecenas sodales ligula sodales pellentesque scelerisque. Pellentesque ut mi nec metus blandit pellentesque non in massa. Donec et auctor turpis, eget finibus ante. Duis dictum viverra mauris non vehicula. Pellentesque sit amet mi blandit, vehicula dui at, volutpat quam. Fusce euismod leo eu lacus iaculis, at vehicula quam pretium. Morbi consequat interdum lacinia. Aenean sed turpis vitae libero tincidunt tincidunt. Sed a bibendum risus, eget congue augue. Phasellus a maximus urna, vestibulum molestie eros. In eu vulputate nunc. ', copagos: 'No', ingresoAOL:'si', planes: 'A00, A01', fechaActualizacion:'13/04/2024'},
  { id: '2', nombre: 'Obra Social de Petroleros', siglas: 'OSPE', codigo: '918', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'no', grillada: 'si', preimpresa: 'Si, consultar norma', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'B25, B58', fechaActualizacion:'01/07/2024'},
  { id: '3', nombre: 'Obra Social del quimicos y del carton', siglas: 'OSPEQC', codigo: '875', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'bronce, plata, oro', fechaActualizacion:'01/06/2024'},
  { id: '4', nombre: 'Obra Social de los panaderos', siglas: 'OSPAN', codigo: '75', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: ' 12 mil', copagos: 'No', ingresoAOL:'si', planes: 'sin planes', fechaActualizacion:'01/08/2024'},
  { id: '5', nombre: 'Obra Social de Empleados Bancarios', siglas: 'OSEB', codigo: '1234', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'si, solo prácticas COVID', grillada: 'si', preimpresa: 'Si, enviar copia a atención al bioquímico para poder ser facturada', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'A00, A01', fechaActualizacion:'13/04/2024'},
  { id: '6', nombre: 'Obra Social de Trabajadores de la Construcción', siglas: 'OSTC', codigo: '5678', credencial: 'plástica', DNI: 'SI', digital: 'si', electronica: 'no', grillada: 'si', preimpresa: 'Si, consultar norma', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'B25, B58', fechaActualizacion:'01/07/2024'},
  { id: '7', nombre: 'Obra Social de Maestros y Profesores', siglas: 'OSMP', codigo: '9101', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'bronce, plata, oro', fechaActualizacion:'01/06/2024'},
  { id: '8', nombre: 'Obra Social de Metalúrgicos', siglas: 'OSMET', codigo: '1121', credencial: 'digital', DNI: 'SI', digital: 'si', electronica: 'si', grillada: 'si', preimpresa: 'Si, consultar norma', APB: '12 mil', copagos: 'No', ingresoAOL:'si', planes: 'sin planes', fechaActualizacion:'01/08/2024'},
];


export default function NormasObrasSocialesScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los datos basados en el término de búsqueda
  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.siglas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
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

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = '30%'; // 32 es el padding total (16 * 2)

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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  list: {
    justifyContent: 'space-between',
    gap:20,
  },
  item: {
    width: ITEM_WIDTH,
    marginRight:17,
    backgroundColor: '#009D96',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 10,
  },
  siglas: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  codigo: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#FF893E',
    textAlign: 'center',
    width: '100%',
  },
});