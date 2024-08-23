import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const handleRecoverPassword = () => {
  const email = "comunicacion@fbpba.org.ar";
  const subject = "Recuperación de Contraseña";
  const body = "Hola, soy Bioquímico Federado perteneciente al distrito ... y no recuerdo mi contraseña, necesito restablecerla.";
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  Linking.openURL(mailtoUrl);
};

export default function PerfilScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <View style={styles.profileImage}>
        {/* Imagen redonda */}
        <AntDesign name="user" size={200} color="#00A8A2" />
      </View>
      
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.cambiarContraseña} onPress={handleRecoverPassword}>
        <Text style={styles.buttonText}>Solicitar Cambio de Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cerrarSesion} onPress={() => navigation.replace('Login')} >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      </View>
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
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 20,
  },
  profileImage: {
    width: 220,
    height: 220,
    borderRadius: 120, // Hace que la imagen sea redonda
    borderColor: '#00A8A2',
    borderWidth: 12,
    marginTop:50,
  },
  nombre: {   
    marginTop: 40, 
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
  },
  codigoFacturante: {   
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF893E',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  cerrarSesion: {
    width:'100%',
    padding: 20,
    backgroundColor: '#FF893E',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cambiarContraseña: {
    width:'100%',
    padding: 20,
    backgroundColor: '#0073A2',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
});
