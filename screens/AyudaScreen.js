import React, {} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Button, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AyudaScreen() {

  const openWhatsApp = (phoneNumber) => {
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      
    <Text style={styles.textoTitulo}>¿Necesitas ayuda?</Text>
    <Text style={styles.textoDescripcion}>Para consultas sobre novedades, facturación, FabaSalud, pagos, y otros temas, contactanos por WhatsApp.</Text>


        <TouchableOpacity style={[styles.contactoWhatsapp]} onPress={() => openWhatsApp('542216752353')}>
        <Text style={styles.buttonText}>Atención al Bioquímico</Text>
        <Ionicons name="logo-whatsapp" size={40} color="white" />
        </TouchableOpacity>

        
    <Text style={styles.textoTitulo}>Consultas sobre autorizaciones:</Text>
    <Text style={styles.textoDescripcion}>Para autorizaciones de órdenes, comunicate con nosotros por WhatsApp.</Text>
        
        <TouchableOpacity style={[styles.contactoWhatsapp]} onPress={() => openWhatsApp('542213171956')}>
        <Text style={styles.buttonText}>AOL</Text>
        <Ionicons name="logo-whatsapp" size={40} color="white" />
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
    padding: 16,
  },
  contactoWhatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,  
    width:'100%',
    padding: 20,
    backgroundColor: '#009D96',
    marginBottom:20,
    borderRadius:20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },

  textoTitulo: {    
    fontWeight: 'bold',
    fontSize: 28,
    color: 'grey',
    marginBottom:20,
    paddingHorizontal:20,
  },

  textoDescripcion: {    
    paddingHorizontal:20,
    marginBottom:20,
    fontSize: 18,
    color: 'grey',
  },
});
