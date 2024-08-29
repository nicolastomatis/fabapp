// ConfiguracionNotificacionesScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Switch, TouchableOpacity, Modal, Animated } from 'react-native';
import styles from '../styles/configuracionNotificaciones';
import { cargarFiltros } from '../components/notificaciones/storage';
import { handleGuardarFiltros } from '../components/notificaciones/guardarFiltros';
import { closeModal } from '../components/notificaciones/cerrarModal';
import { toggleSwitch } from '../components/notificaciones/switch';

const ConfiguracionNotificacionesScreen = ({ navigation }) => {
  const [filters, setFilters] = useState({
    comunicaciones: true,
    novedades: true,
    gacetillas: true,
    generales: true,
    otras: true,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initFilters = async () => {
      const savedFilters = await cargarFiltros();
      if (savedFilters) {
        setFilters(savedFilters);
      }
    };
    initFilters();
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(filters).map((key) => (
        <View key={key} style={styles.filterRow}>
          <Text style={styles.filterText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <Switch
            value={filters[key]}
            onValueChange={() => toggleSwitch(key, filters, setFilters)}
            thumbColor={filters[key] ? '#00A8A2' : '#CCC'}
            trackColor={{ false: '#767577', true: '#1E6B65' }}
            style={styles.switch}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => handleGuardarFiltros(filters, setModalMessage, setShowModal, scaleValue, opacityValue)}
      >
        <Text style={styles.saveButtonText}>Guardar Configuración</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="none"
        onRequestClose={() => closeModal(setShowModal, navigation, filters, scaleValue, opacityValue)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleValue }],
              opacity: opacityValue,
            }
          ]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => closeModal(setShowModal, navigation, filters, scaleValue, opacityValue)}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfiguracionNotificacionesScreen;
