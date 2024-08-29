import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Calendar from '../assets/feriados/Calendar';
import moment from 'moment';
import 'moment/locale/es';
import Entypo from '@expo/vector-icons/Entypo';

const feriados = require('../assets/feriados/feriados.json');

// Función para obtener el último día del mes
const getLastDayOfMonth = (date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return moment(lastDay).format('YYYY-MM-DD');
};

export default function FacturacionScreen() {

  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const markedDates = [];

    // Procesar los feriados
    feriados.forEach(feriado => {
      const date = moment(feriado.date).format('YYYY-MM-DD');
      markedDates.push(date);
    });

    // Agregar el último día del mes
    const today = new Date();
    const lastDayOfMonth = getLastDayOfMonth(today);
    markedDates.push(lastDayOfMonth);

    setMarkedDates(markedDates);
  }, []);

  const handleDayPress = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD')); // Formatear la fecha
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            date={new Date()}
            onDayPress={handleDayPress}
            markedDates={markedDates}
          />
        </View>
        <View style={styles.referencia}>
          <View style={styles.item}>
            <Text style={styles.fechalimite}>Fechas límite:</Text>
            <Entypo name="controller-record" size={40} color="#FF893E" />
          </View>
          <View style={styles.item}>
            <Text style={styles.feriado}>Feriado</Text>
            <Entypo name="controller-record" size={40} color="grey" />
          </View>
        </View>
        <View style={styles.referencia}>
          <View style={styles.descripcion}>
            <Text style={styles.texto}>Les recordamos las fechas límite para:</Text>
            <Text style={styles.informacionTexto}><Entypo name="controller-record" size={15} color="#FF893E" /> Enviar a través de AOL las transacciones para facturar PAMI.</Text>
            <Text style={styles.informacionTexto}><Entypo name="controller-record" size={15} color="#FF893E" /> Suspender órdenes de IOMA pacientes NO atendidos.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    width: '100%',
    height:400,
    backgroundColor: '#fff',
    padding: 20,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    height:'100%',
  },
  referencia: {
    marginTop: 20,
    backgroundColor: '#F1F1F1',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descripcion: {
    flexDirection: 'column',
    alignItems: 'start',
  },
  fechalimite: {
    fontWeight: 'bold',
    color: '#FF893E',
    fontSize: 16,
  },
  feriado: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 16,
  },
  texto: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 18,
    textAlign:'justify',
  },
  informacionTexto: {
    color: 'grey',
    fontSize: 16,
    marginTop:15,
    textAlign:'justify',
  },
});
