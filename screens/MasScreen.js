import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';

export default function MasScreen({ navigation }) {
  const handleLogout = () => {
    navigation.replace('Login');
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.section}>
            <TouchableOpacity style={styles.contenedor} onPress={() => navigation.navigate('Inicio')}>
            <Image source={require('../assets/icons/home.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contenedor} onPress={() => navigation.navigate('Notificaciones')}>
            <Image source={require('../assets/icons/notificaciones.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>Notificaciones</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contenedor} onPress={() => navigation.navigate('Ayuda')}>
            <Image source={require('../assets/icons/ayuda.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contenedor} onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/icons/user.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>Mi perfil</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comunidades</Text>


            <TouchableOpacity style={styles.contenedor} onPress={() => openLink('http://faba.org.ar/')}>

              <Image source={require('../assets/icons/fabaicon.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>faba.org.ar</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.contenedor} onPress={() => openLink('https://fabainforma.org.ar/')}>

              <Image source={require('../assets/icons/fiicon.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>fabainforma.org.ar</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.contenedor} onPress={() => openLink('http://www.abcl.org.ar/')}>

              <Image source={require('../assets/icons/abclicon.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>abcl.org.ar</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.contenedor} onPress={() => openLink('http://www.analisisbioquimicos.com.ar/')}>

              <Image source={require('../assets/icons/abicon.png')}
                style={styles.icon}
              />
              <Text style={styles.texto}>analisisbioquimicos.com.ar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.contenedor} onPress={() => navigation.navigate('Login')}>
          <Image source={require('../assets/icons/cerrar.png')}
                style={styles.icon}
              />
            <Text style={styles.texto}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0073A2',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0073A2',
  },
  contenedor: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },
  section: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#fff',
  },
  texto: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    marginVertical: 11,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
    textDecorationLine: 'none',
    fontWeight: 'bold',
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: 'white',
  },
});
