import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Linking } from 'react-native';
import styles from '../../styles/normaDetalleStyles';

const RenderPdfButton = ({ pdfPartialUrl }) => {
    if (pdfPartialUrl && pdfPartialUrl.trim()) {
        const filePath = pdfPartialUrl.replace('\\FABAWEBCL1', '');
        const fullUrl = `http://faba.org.ar${filePath.replace(/\\/g, '/')}`;

        return (
            <TouchableOpacity style={styles.floatingButton} onPress={() => Linking.openURL(fullUrl)}>
                <Text style={styles.buttonText}>Abrir PDF</Text>
            </TouchableOpacity>
        );
    } else {
        return <Text style={styles.floatingButton}>No hay PDF disponible</Text>;
    }
};

export default RenderPdfButton;
