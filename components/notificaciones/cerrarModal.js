import { cargarFiltros } from './storage';
import { animateModal } from '../animation';

export const closeModal = async (setShowModal, navigation, filters, scaleValue, opacityValue) => {
  animateModal(scaleValue, opacityValue, false);
  setTimeout(async () => {
    setShowModal(false);
    const savedFilters = await cargarFiltros();
    navigation.navigate('Notificaciones', { filtrosActualizados: savedFilters || filters });
  }, 300);
};
