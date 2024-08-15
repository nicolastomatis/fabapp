import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';

export default function CambiarContrasenaScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSaveChanges = () => {
    // Aquí puedes agregar la lógica para guardar la nueva contraseña
    if (newPassword === confirmNewPassword) {
      // Suponiendo que la contraseña se cambió correctamente
      Alert.alert(
        "Éxito",
        "Contraseña modificada correctamente",
        [
          { text: "OK", onPress: () => navigation.navigate('Inicio') }
        ]
      );
    } else {
      Alert.alert(
        "Error",
        "Error al intentar modificar la contraseña"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese Contraseña Actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese Contraseña Nueva"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repita Contraseña Nueva"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      <Button
        title="Guardar Cambios"
        onPress={handleSaveChanges}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
});
