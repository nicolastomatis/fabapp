import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from '../styles/ayudaStyles'; // Importamos los estilos desde el archivo styles.js
import WhatsAppButton from '../components/ayuda/botonWhatsApp'; // Importamos el componente de botón de WhatsApp

export default function AyudaScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <Text style={styles.textoTitulo}>¿Necesitas ayuda?</Text>
        <Text style={styles.textoDescripcion}>Para consultas sobre novedades, facturación, FabaSalud, pagos, y otros temas, contactanos por WhatsApp.</Text>
        
        <WhatsAppButton phoneNumber='542216752353' label='Atención al Bioquímico' />
        
        <Text style={styles.textoTitulo}>Consultas sobre autorizaciones:</Text>
        <Text style={styles.textoDescripcion}>Para autorizaciones de órdenes, comunicate con nosotros por WhatsApp.</Text>
        
        <WhatsAppButton phoneNumber='542213171956' label='AOL' />
      </View>
    </SafeAreaView>
  );
}
