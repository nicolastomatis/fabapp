import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import holidays from '../feriados/feriados.json'; // Asegúrate de que la ruta sea correcta

moment.defineLocale('es', {
  week: {
    dow: 1, // El primer día de la semana es domingo
  },
});

// Configuración de los nombres de los días de la semana
const dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

// Generar un rango de fechas para el mes actual
const generateDays = (date) => {
  const startOfMonth = moment(date).startOf('month').startOf('week'); // Semana empieza en domingo
  const endOfMonth = moment(date).endOf('month').endOf('week');
  const days = [];
  for (let day = startOfMonth; day <= endOfMonth; day.add(1, 'day')) {
    days.push(day.clone());
  }
  return days;
};

const Calendar = ({ date, onDayPress, markedDates, currentDate }) => {
  const [currentMonth, setCurrentMonth] = useState(moment(date));
  const days = generateDays(currentMonth);

  const holidaysMap = new Map(holidays.map(holiday => [holiday.date, holiday.name]));
  const today = moment().format('YYYY-MM-DD'); // Fecha de hoy

  const renderDay = ({ item }) => {
    const formattedDate = item.format('YYYY-MM-DD');
    const isMarked = markedDates.includes(formattedDate);
    const isHoliday = holidaysMap.has(formattedDate);
    const isCurrentMonth = item.month() === currentMonth.month();
    const isToday = formattedDate === today;

    return (
      <TouchableOpacity
        style={[
          styles.day,
          !isCurrentMonth && styles.outsideMonth,
          isMarked && styles.markedDay,
          isHoliday && styles.holidayDay,
          isToday && styles.todayDay // Estilo para el día actual
        ]}
        onPress={() => onDayPress(item)}
      >
        <Text style={[
          styles.dayText,
          !isCurrentMonth && styles.outsideMonthText,
          isMarked && !isHoliday && styles.markedDayText,
          isHoliday && styles.holidayDayText,
          isToday && styles.todayDayText // Color del texto para el día actual
        ]}>
          {item.date()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        {dayNames.map((dayName, index) => (
          <View key={index} style={styles.dayNameContainer}>
            <Text style={styles.dayNameText}>{dayName}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.lineaAzul]}>
        <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY').toUpperCase()}</Text>
      </View>
      {renderHeader()}
      <FlatList
        data={days}
        renderItem={renderDay}
        keyExtractor={(item) => item.format('YYYY-MM-DD')}
        numColumns={7}
        scrollEnabled={false}  // Deshabilita el scroll interno

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC7324',
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 2,
  },
  markedDay: {
    backgroundColor: '#FF893E',
    borderRadius: 25,
    padding: 5,
  },
  holidayDay: {
    backgroundColor: 'grey', // Color para los días feriados
  },
  todayDay: {
    borderColor: '#00A8A2',
    borderWidth: 2, // Borde especial para el día actual
  },
  todayDayText: {
    color: '#00A8A2', // Color del texto para el día actual
    fontWeight: 'bold',
  },
  dayText: {
    color: 'grey',
  },
  dayNameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  lineaAzul: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#0671B8',
  },
  dayNameText: {
    fontWeight: 'bold',
    color: '#0671B8',
  },
  outsideMonthText: {
    color: '#B0B0B0', // Gris claro para el texto de los días fuera del mes actual
  },
  markedDayText: {
    color: 'white', // Color del texto para los días marcados
  },
  holidayDayText: {
    color: 'white', // Color del texto para los días feriados
  },
  outsideMonth: {
    opacity: 0.5, // Estilo para los días fuera del mes actual
  },
});

export default Calendar;
