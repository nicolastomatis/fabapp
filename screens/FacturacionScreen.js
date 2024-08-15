// FacturacionScreen.js
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale en español
import Entypo from '@expo/vector-icons/Entypo';

export default function FacturacionScreen() {
  moment.locale('es'); // Configura moment para usar español

  const markedDates = {
    '2024-08-09': {
      selected: true,
      marked: false,
      selectedColor: '#00A8A2',
      selectedTextColor: 'white',
    },
    '2024-08-16': {
      selected: true,
      marked: false,
      selectedColor: '#00A8A2',
      selectedTextColor: 'white',
    },
    '2024-08-23': {
      selected: true,
      marked: false,
      selectedColor: '#00A8A2',
      selectedTextColor: 'white',
    },
    '2024-08-30': {
      selected: true,
      marked: false,
      selectedColor: '#00A8A2',
      selectedTextColor: 'white',
    },
    '2024-08-17': {
      selected: true,
      marked: false,
      selectedColor: 'grey',
      selectedTextColor: 'white',
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date().toISOString().split('T')[0]}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]}
            hideExtraDays={true}
            firstDay={0}
            disableMonthChange={false}
            markedDates={markedDates}
            theme={{
              calendarBackground: '#F1F1F1',
              textSectionTitleColor: '#EC7324',
              selectedDayBackgroundColor: '#0671B8',
              selectedDayTextColor: '#fff',
              todayTextColor: '#0671B8',
              dayTextColor: '#7E7E7E',
              monthTextColor: '#EC7324',
              arrowColor: '#EC7324',
            // Cambia el tamaño del texto
            textDayFontSize: 16, // Tamaño del texto de los días
            textMonthFontSize: 24, // Tamaño del texto del mes
            textDayHeaderFontSize: 16, // Tamaño del texto de los encabezados de los días
          }}
          />
        </View>
        <View style={styles.referencia}>
        <View style={styles.item}>
          <Text style={styles.diaDePago}>Día de pago</Text>
          <Entypo name="controller-record" size={40} color="#00A8A2" />
        </View>
        <View style={styles.item}>
          <Text style={styles.feriado}>Feriado</Text>
          <Entypo name="controller-record" size={40} color="grey" />
        </View>
      </View>
        <View style={styles.referencia}>
        <View style={styles.item}>
          <Text style={styles.texto}>Última facturación:</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.diaPagado}>09/07/2024</Text>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  referencia: {
    marginTop:20,
    backgroundColor: '#F1F1F1',
    padding:20,
    borderRadius:20,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  diaDePago: {
    fontWeight: 'bold',
    color: '#00A8A2',
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
    fontSize: 16,
  },
  diaPagado: {
    fontWeight: 'bold',
    color: '#FF893E',
    fontSize: 16,
  },
});
