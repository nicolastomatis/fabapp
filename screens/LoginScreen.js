import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Image, Linking, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const url = `http://www.fabawsmobilev2.faba.org.ar/Service1.asmx/IniciarSesion?user=${username}&password=${password}`;
  
    console.log('Fetching from URL:', url);
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        
        // Accedemos a la propiedad correcta para obtener el token
        const token = data.response.token;
        
        if (token) {
          console.log('Login successful, token:', token);
          // Si el login es exitoso, navega a la pantalla principal
          navigation.replace('Main');
        } else {
          console.log('Login failed, no token received');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };
  

  const handleRequestUser = () => {
    const email = "comunicacion@fbpba.org.ar";
    const subject = "Solicitud de Usuario";
    const body = "Hola, soy Bioquímico Federado perteneciente al distrito ... y solicito un usuario para poder ingresar a la aplicación.";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
  };

  const handleRecoverPassword = () => {
    const email = "comunicacion@fbpba.org.ar";
    const subject = "Recuperación de Contraseña";
    const body = "Hola, soy Bioquímico Federado perteneciente al distrito ... y no recuerdo mi contraseña y necesito restablecerla.";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
  };

  return (
    <ImageBackground source={require('../assets/images/fondo.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.requestButton} onPress={handleRecoverPassword}>
            <Text style={styles.recoverPasswordText}>Solicitar Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestButton} onPress={handleRequestUser}>
            <Text style={styles.requestButtonText}>Solicitar Usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 25,
    paddingBottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  logo: {
    width: 225,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: '#0073A2',
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#0073A2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestButton: {
    borderColor: '#0073A2',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestButtonText: {
    color: '#00A8A2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recoverPasswordText: {
    color: '#00A8A2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
