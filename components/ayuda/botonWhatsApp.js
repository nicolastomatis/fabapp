import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from '../../styles/ayudaStyles'; // Usamos los mismos estilos

const WhatsAppButton = ({ phoneNumber, label }) => {
    const openWhatsApp = (phoneNumber) => {
        Linking.openURL(`https://wa.me/${phoneNumber}`);
    };

    return (
        <TouchableOpacity style={styles.contactoWhatsapp} onPress={() => openWhatsApp(phoneNumber)}>
            <Text style={styles.buttonText}>{label}</Text>
            <Ionicons name="logo-whatsapp" size={40} color="white" />
        </TouchableOpacity>
    );
};

export default WhatsAppButton;
