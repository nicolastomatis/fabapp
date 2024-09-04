import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Linking,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const navigation = useNavigation();
  
  // Animación de zoom
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  const handleLogin = async () => {
    try {
        const formData = new URLSearchParams();
        formData.append('user', user);
        formData.append('password', password);

        const res = await fetch('https://us-central1-fabapp-b7caa.cloudfunctions.net/iniciarSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log('Respuesta del servidor:', data);

        if (data.response.usuario.valido === 'SI') {
            // Suponiendo que el token expira en 1 hora
            const expirationTime = new Date().getTime() + 3600000; // 1 hora en milisegundos
            const sessionData = {
                ...data.response,
                expiration: expirationTime,
            };
            await AsyncStorage.setItem('@session_data', JSON.stringify(sessionData));
            navigation.navigate('Main');
            setLoginFailed(false);
        } else {
            openModal('Usuario o contraseña inválidos');
            setLoginFailed(true);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        openModal('Error al comunicarse con el servidor');
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
            {/* Modal */}
            <Modal
              visible={showModal}
              transparent={true}
              animationType="none"
              onRequestClose={closeModal}
            >
              <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
                  <Text style={styles.modalText}>{modalMessage}</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                    <Text style={styles.modalButtonText}>Aceptar</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom:40,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 40,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF893E',
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
