import { guardarFiltros } from './storage';
import { animateModal } from '../animation';

export const handleGuardarFiltros = async (filters, setModalMessage, setShowModal, scaleValue, opacityValue) => {
  const success = await guardarFiltros(filters);
  setModalMessage(success ? 'Tus preferencias han sido guardadas.' : 'Hubo un problema al guardar la configuración.');
  setShowModal(true);
  animateModal(scaleValue, opacityValue, true);
};
