import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, ScrollView } from 'react-native';

export default function ConfiguracionNotificacionesScreen() {
  const [notifications, setNotifications] = useState({
    comunicaciones: false,
    novedades: false,
    gacetillas: false,
    generales: false,
    actualizacionNorma: false,
    envioSobres: false,
    recordatorios: false,
  });

  const toggleSwitch = (key) => {
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [key]: !prevNotifications[key],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.option}>
          <Text style={styles.label}>Comunicaciones</Text>
          <Switch
            value={notifications.comunicaciones}
            onValueChange={() => toggleSwitch('comunicaciones')}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Novedades</Text>
          <Switch
            value={notifications.novedades}
            onValueChange={() => toggleSwitch('novedades')}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Gacetillas</Text>
          <Switch
            value={notifications.gacetillas}
            onValueChange={() => toggleSwitch('gacetillas')}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Generales</Text>
          <Switch
            value={notifications.generales}
            onValueChange={() => toggleSwitch('generales')}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Actualización de la Norma</Text>
          <Switch
            value={notifications.actualizacionNorma}
            onValueChange={() => toggleSwitch('actualizacionNorma')}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Envío de Sobres</Text>
          <Switch
            value={notifications.envioSobres}
            onValueChange={() => toggleSwitch('envioSobres')}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Recordatorios</Text>
          <Switch
            value={notifications.recordatorios}
            onValueChange={() => toggleSwitch('recordatorios')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderColor: 'gray',
    borderBottomWidth: 0.2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
});
