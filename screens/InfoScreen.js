import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, StatusBar, ScrollView } from "react-native";

const InfoScreen = () => {
    return (

        <ImageBackground source={require('../assets/images/Imagen4.jpg')} style={styles.background}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <SafeAreaView style={styles.overlay}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.contenido}>
                            <Text style={styles.titulo}>Acceso a Telemedicina para Federados</Text>
                            <Text style={styles.text}>Doctor FABA es un servicio de telemedicina diseñado para facilitar el acceso a consultas médicas de calidad, sin costo para el usuario titular. Esta plataforma busca brindar una herramienta ágil y eficiente para el cuidado de la salud.</Text>
                            <Text style={styles.subtitulo}>¿Qué te ofrece Doctor FABA?</Text>
                            <Text style={styles.text}><Text style={styles.textBold}>• Atención médica en línea:</Text> Especialidades de medicina clínica, ginecología y pediatría a tu disposición.</Text>
                            <Text style={styles.text}><Text style={styles.textBold}>• Disponibilidad 24/7:</Text> Atención médica las 24 horas del día, los 7 días de la semana, los 365 días del año. ¡Tu salud no tiene horarios!</Text>
                            <Text style={styles.text}><Text style={styles.textBold}>• Recetas y órdenes digitales:</Text> Recibe recetas médicas, órdenes de estudios y constancias de atención en formato digital, ¡sin complicaciones!</Text>
                            <Text style={styles.text}><Text style={styles.textBold}>• Profesionales de primer nivel:</Text> Nuestro equipo está conformado por médicos altamente capacitados para brindarte la mejor atención.</Text>
                            <Text style={styles.text}><Text style={styles.textBold}>• Respuesta inmediata:</Text> Obtén indicaciones médicas precisas y adaptadas a tu situación.</Text>
                            <Text style={styles.subtitulo}>Requisitos para acceder al servicio</Text>
                            <Text style={styles.text}>• El titular del servicio debe estar registrado.</Text>
                            <Text style={styles.text}>• Si cuenta con una cobertura médica puede proporcionar el nombre y nro. de afiliado para que luego esté consignado en las prescripciones.</Text>
                            <Text style={styles.subtitulo}>Grupo Familiar</Text>
                            <Text style={styles.text}>Doctor FABA permite la inclusión de familiares directos a cargo (esposa/o e hijas/os) por un costo de $300 (pesos trescientos). Consulte por otros familiares a cargo.</Text>
                            <Text style={styles.text}>Este servicio podrá ser utilizado por el grupo familiar adherido únicamente a través de la App de FABA, en su teléfono celular.</Text>
                            <Text style={styles.subtitulo}>Acceso al Servicio</Text>
                            <Text style={styles.text}>• Plataforma FABA: El usuario titular debe acceder a la página de FABA e ingresar a la sección Doctor FABA.</Text>
                            <Text style={styles.text}>• Se requiere completar un formulario de registro, la declaración jurada y aceptar los términos y condiciones del servicio.</Text>
                            <Text style={styles.text}>Una vez registrado, tanto el profesional como su grupo familiar podrán acceder a la atención de telemedicina a través de la web o la app de FABA.</Text>
                            <Text style={styles.text}>Más información al email: drfaba@fbpba.org.ar o al teléfono 0221 – 4457000.</Text>
                            
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 175, 160, 0.3)',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(14, 113, 182, 0.3)',
    },
    contenido: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        width: '100%',
    },
    titulo: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 20,
        color: '#555',
    },    
    textBold: {
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});


export default InfoScreen;
