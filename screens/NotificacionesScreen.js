import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Animated, TouchableOpacity  } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function NotificacionesScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionNotificacionesScreen')}>
          <AntDesign name="setting" size={30} color="#00A8A2" style={{ marginRight: 20 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [notificaciones, setNotificaciones] = useState([
    { id: '1', tipo: 'general', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '2', tipo: 'novedad', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '3', tipo: 'gacetilla', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '4', tipo: 'otras', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '5', tipo: 'comunicacion', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '6', tipo: 'general', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '7', tipo: 'novedad', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '8', tipo: 'gacetilla', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '9', tipo: 'comunicacion', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
    { id: '10', tipo: 'otras', nombre: '202408075158 - ISALUD S.R.L. ', asunto: 'Incremento de Aranceles' },
  ]);

  const borrarNotificacion = (id) => {
    setNotificaciones(notificaciones.filter(notificacion => notificacion.id !== id));
  };

  const renderNotificacion = ({ item }) => {
    const translateX = new Animated.Value(0);

    const handleGesture = Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: true }
    );

    const handleGestureEnd = (event) => {
      const translationX = event.nativeEvent.translationX;
      const direction = translationX > 0 ? 1 : -1;

      if (Math.abs(translationX) > 150) {
        Animated.timing(translateX, {
          toValue: 500 * direction,
          duration: 300,
          useNativeDriver: true,
        }).start(() => borrarNotificacion(item.id));
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    };

    const estiloNotificacion = [
      styles.notificacion,
      item.tipo === 'comunicacion' && styles.comunicacion,
      item.tipo === 'novedad' && styles.novedad,
      item.tipo === 'gacetilla' && styles.gacetilla,
      item.tipo === 'general' && styles.general,
      item.tipo === 'otras' && styles.otras,
    ];

    return (
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onEnded={handleGestureEnd}
      >
        <Animated.View style={[...estiloNotificacion, { transform: [{ translateX }] }]}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.asunto}>{item.asunto}</Text>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notificaciones}
        renderItem={renderNotificacion}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listaNotificaciones}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  listaNotificaciones: {
    width: '100%',
    padding: 20,
  },
  notificacion: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },  
  asunto: {
    fontSize: 16,
    color: 'white',
  },
  comunicacion: {
    backgroundColor: '#FB9E70',
  },
  novedad: {
    backgroundColor: '#A27BF9',
  },
  gacetilla: {
    backgroundColor: '#62BFB6',
  },
  general: {
    backgroundColor: '#6998FA',
  },
  otras: {
    backgroundColor: '#CBCBCB',
  },
});
