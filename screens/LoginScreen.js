import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Image, Linking, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async () => {
    try {
      // Formatear los datos como una cadena de consulta
      const formData = new URLSearchParams();
      formData.append('user', user);
      formData.append('password', password);

      // Realizar la solicitud POST con el formato adecuado
      const res = await fetch('http://www.fabawsmobile.faba.org.ar/Service1.asmx/IniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString() // Enviar los datos en el formato adecuado
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json(); // Recibir la respuesta como JSON
      console.log('Respuesta del servidor:', data);

      if (data.response.usuario.valido === 'SI') {
        // Guardar los datos en AsyncStorage
        await AsyncStorage.setItem('@session_data', JSON.stringify(data.response));

        // Navegar a la pantalla principal
        navigation.navigate('Main');
        setLoginFailed(false);
      } else {
        // Mostrar alerta de usuario o contraseña inválidos
        Alert.alert('Error', 'Usuario o contraseña inválidos');
        setLoginFailed(true);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Error al comunicarse con el servidor');
      setLoginFailed(true);
    }
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

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground source={require('../assets/images/fondo.jpg')} style={styles.backgroundImage}>
          <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <TextInput
              style={[styles.input, loginFailed && styles.inputError]}
              placeholder="Nombre de usuario"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={user}
              onChangeText={setUser}
              onSubmitEditing={handleDismissKeyboard}
            />
            <TextInput
              style={[styles.input, loginFailed && styles.inputError]}
              placeholder="Contraseña"
              placeholderTextColor="gray"
              keyboardType="numeric"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleDismissKeyboard}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  inputError: {
    borderColor: 'red',
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
