import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/normaDetalleStyles';
import RenderField from '../components/detalleNorma/render';
import RenderApbField from '../components/detalleNorma/renderAPB';
import RenderPdfButton from '../components/detalleNorma/renderPDFBoton';

const NormaDetalleScreen = ({ navigation, route }) => {
  const { details } = route.params;

  if (!details || typeof details !== 'object') {
    return (
      <SafeAreaView style={styles.Safecontainer}>
        <Text style={styles.errorText}>Error al cargar los detalles. Por favor, inténtelo nuevamente.</Text>
      </SafeAreaView>
    );
  }

  const [collapsedSections, setCollapsedSections] = useState({
    textoapb: true,
    apb: true,
    tipoOrden: true,
    planes: true,
    plazoValidez: true,
  });

  const toggleSection = (section) => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const isValueValid = (value) => value !== undefined && value !== null && value !== 0 && (typeof value !== 'string' || value.trim());

  const stripHtmlTags = (html) => {
    if (typeof html !== 'string') {
        console.warn('Valor no es una cadena:', html);
        return '';
    }
    const textWithLineBreaks = html.replace(/<br\s*\/?>/gi, '\n');
    return textWithLineBreaks.replace(/<[^>]*>?/gm, '');
};


  useEffect(() => {
    if (details?.sigla) {
      navigation.setOptions({ title: details.sigla });
    }
  }, [details?.sigla]);

  return (
    <SafeAreaView style={styles.Safecontainer}>
      <ScrollView style={styles.container}>
        <RenderField label='' value={details.nombre} showLabel={false} />
        
        <View style={styles.contenedorConLinea}>
          <Text style={styles.descripcion}>Documentación que debe presentar el afiliado para su atención en el laboratorio</Text>
        </View>

        {isValueValid(details.codigomutual) && <RenderField label='Código' value={details.codigomutual} />}
        {isValueValid(details.fechaversion) && <RenderField label={'Fecha de versión \nde la norma'} value={details.fechaversion} />}
        {isValueValid(details.credencialdigital) && <RenderField label='Credencial Digital' value={details.credencialdigital} />}
        {isValueValid(details.credencialplastica) && <RenderField label='Credencial Plástica' value={details.credencialplastica} />}
        {isValueValid(details.dni) && <RenderField label='DNI' value={details.dni} />}

        {isValueValid(details.tipoOrden) && <RenderField label='Formato de orden' value={details.tipoOrden} isCollapsible={true} collapsed={collapsedSections.tipoOrden} onToggle={() => toggleSection('tipoOrden')} />}
        
        {isValueValid(details.validezdesde) && <RenderField label='Plazo de validez de orden' value={{ elPlazoDeValidez: { validoDias: details.validezdias, validezDesde: details.validezdesde } }} isCollapsible={true} collapsed={collapsedSections.plazoValidez} onToggle={() => toggleSection('plazoValidez')} showLabel={true} />}
        
        {isValueValid(details.copago) && <RenderField label='Copago' value={details.copago} />}
        
        {isValueValid(details.apb) && <RenderApbField value={details.apb} description={stripHtmlTags(details.textoapb)} practicaapb={details.practicaapb} pagaporfaba={details.pagaporfaba} valoracreditadosapb={details.valoracreditadosapb} tipoapb={details.tipoapb} />}
        
        {isValueValid(details.planes) && <RenderField label='Planes' value={stripHtmlTags(details.planes)} isCollapsible={true} collapsed={collapsedSections.planes} onToggle={() => toggleSection('planes')} />}
        
        {isValueValid(details.aol) && <RenderField label='AOL' value={details.aol} />}
        
        {isValueValid(details.fechapublicacion) && <RenderField label={'Fecha de \npublicación'} value={details.fechapublicacion} />}
        
        <RenderPdfButton pdfPartialUrl={details.pdf} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NormaDetalleScreen;
