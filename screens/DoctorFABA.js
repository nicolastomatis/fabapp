import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Image, Alert, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Linking } from 'react-native';  // Importando Linking para abrir la URL
import { useNavigation } from "@react-navigation/native";
import CustomModal from '../components/CustomModal';

const FacturanteScreen = () => {
    const [personas, setPersonas] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        obtenerFacturante();
    }, []);

    const obtenerFacturante = async () => {
        setLoading(true);
        setError(null);

        try {
            const sessionData = await AsyncStorage.getItem('@session_data');
            if (!sessionData) throw new Error('No se encontraron datos de sesión.');

            const { token, usuario } = JSON.parse(sessionData);
            if (!token || !usuario || !usuario.cod) throw new Error('Datos de sesión incompletos.');

            const firebaseFunctionUrl = 'https://us-central1-fabapp-b7caa.cloudfunctions.net/DrFABATraerFacturante';

            const response = await axios.post(
                firebaseFunctionUrl,
                { token, idusuario: usuario.cod },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { response: serverResponse } = response.data;
            if (!serverResponse) throw new Error('No se encontró respuesta del servidor.');

            const titular = serverResponse.Titular
                ? serverResponse.Titular.map(t => ({ ...t, type: 'Titular' }))
                : [];
            
            // Asegúrate de que GrupoFamiliar sea un array antes de llamar a .map
            const grupoFamiliar = Array.isArray(serverResponse.GrupoFamiliar)
                ? serverResponse.GrupoFamiliar.map(f => ({ ...f, type: 'Familiar' }))
                : [];

            const personasLista = [...titular, ...grupoFamiliar];

            if (personasLista.length === 0) {
                setPersonas([]); // Actualizar el estado con un arreglo vacío
            } else {
                setPersonas(personasLista);
                setSelectedPerson(personasLista[0]);
                generarJson(personasLista[0]);
            }

        } catch (err) {
            console.error('Error al obtener datos:', err);
            setError(err.message || 'Error al obtener los datos.');
        } finally {
            setLoading(false);
        }
    };

    const limpiarTexto = (texto) => (texto ? texto.trim() : "");

    const generarJson = (person) => {
        if (!person) return;

        const esTitular = person.type === 'Titular';

        // Buscar el titular
        const titular = personas.find(p => p.type === 'Titular');

        // Buscar el grupo familiar si existe
        const familiares = personas.filter(p => p.type === 'Familiar').map(familiar => ({
            email: limpiarTexto(familiar.email || titular?.email || ""),
            name: limpiarTexto(decodeURIComponent(escape(familiar.name))),
            documentNumber: limpiarTexto(familiar.documentnumber.toString()),
            birthDate: limpiarTexto(familiar.birthdate.split('T')[0]),
            gender: limpiarTexto(familiar.gender),
            phone: limpiarTexto(familiar.phone || titular?.phone || ""),
            credential: limpiarTexto(familiar.credential || ""),
            healthInsurance: limpiarTexto(familiar.healthinsurance || ""),
            owner: "false"
        }));

        // Crear JSON según si es titular o familiar
        const json = esTitular
            ? {
                provider: "67bf171addbae1b381c9e111",
                email: limpiarTexto(person.email || ""),
                name: limpiarTexto(decodeURIComponent(escape(person.name))),
                documentNumber: limpiarTexto(person.documentnumber.toString()),
                birthDate: limpiarTexto(person.birthdate.split('T')[0]),
                gender: limpiarTexto(person.gender),
                phone: limpiarTexto(person.phone || ""),
                plan: "",
                credential: limpiarTexto(person.credential || ""),
                healthInsurance: limpiarTexto(person.healthinsurance || ""),
                owner: true,
                zipCode: limpiarTexto(person.zipcode || ""),
                familyGroup: familiares.length > 0 ? familiares : []  // Solo agrega familiares si existen
            }
            : {
                provider: "67bf171addbae1b381c9e111",
                email: limpiarTexto(person.email || titular?.email || ""),
                name: limpiarTexto(decodeURIComponent(escape(person.name))),
                documentNumber: limpiarTexto(person.documentnumber.toString()),
                birthDate: limpiarTexto(person.birthdate.split('T')[0]),
                gender: limpiarTexto(person.gender),
                phone: limpiarTexto(person.phone || titular?.phone || ""),
                plan: "",
                credential: limpiarTexto(person.credential || ""),
                healthInsurance: limpiarTexto(person.healthinsurance || ""),
                owner: false,
                zipCode: limpiarTexto(person.zipcode || ""),
                familyGroup: titular
                    ? [{
                        email: limpiarTexto(titular.email || ""),
                        name: limpiarTexto(decodeURIComponent(escape(titular.name))),
                        documentNumber: limpiarTexto(titular.documentnumber.toString()),
                        birthDate: limpiarTexto(titular.birthdate.split('T')[0]),
                        gender: limpiarTexto(titular.gender),
                        phone: limpiarTexto(titular.phone || ""),
                        plan: "",
                        credential: limpiarTexto(titular.credential || ""),
                        healthInsurance: limpiarTexto(titular.healthinsurance || ""),
                        owner: "true",
                        zipCode: limpiarTexto(titular.zipcode || "")
                    }]
                    : []
            };

        setJsonData(json);
    };

    const iniciarConsulta = async () => {
        if (!jsonData) {
            Alert.alert('Error', 'Por favor selecciona un paciente antes de continuar.');
            return;
        }

        // Client ID y Client Secret
        const clientId = "lM2XLZBkAONPNYe3OUNglL6eMmqoMss3";
        const clientSecret = "656435ff3147d25a24b2491cb55636c3598727fa7d8c4376a21f26f64acb218b";

        // URL para obtener el token
        const tokenUrl = `https://api.llamandoaldoctor.com/patient/token?client_id=${clientId}&client_secret=${clientSecret}`;

        try {
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            if (data.token) {
                // Si obtienes el token, puedes proceder con la consulta
                const consultaUrl = `https://app.llamandoaldoctor.com/?token=${data.token}`;
                Linking.openURL(consultaUrl); // Abrir la URL en el navegador o aplicación web
            } else {
                Alert.alert('Error', data.message || 'Error al obtener el token.');
            }
        } catch (error) {
            console.error("Error al iniciar consulta:", error);
            Alert.alert('Error', 'No se pudo iniciar la consulta. Intenta nuevamente.');
        }
    };

    const navigation = useNavigation();

    const handleMoreInfo = () => {
        navigation.navigate("InfoScreen"); // Asegúrate de tener esta pantalla en tu navegación
    };

    const handleAddFamilyMember = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        Linking.openURL("http://www.faba.org.ar");
    };

    const openPicker = () => {
        setPickerVisible(true);
    };

    const closePicker = () => {
        setPickerVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
                setSelectedPerson(item);
                setPickerVisible(false);
                generarJson(item);
            }}
        >
            <Text style={styles.optionText}>{decodeURIComponent(escape(item.name))}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={require('../assets/images/Imagen4.jpg')} style={styles.background}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}>
                    <Image source={require('../assets/images/logoDoctorFABA.png')} style={styles.logo} />
                    
                    {personas.length > 0 ? (
                        <>
                            <View style={styles.contenido}>
                                <Text style={styles.titulo}>Consulte con un médico ahora</Text>
                                <View style={styles.textContainer}>
                                    {loading && <ActivityIndicator size="large" color="#00b39f" />}
                                    {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
                                    <TouchableOpacity onPress={openPicker} style={styles.picker}>
                                        <Text style={styles.pickerText}>
                                            {selectedPerson ? decodeURIComponent(escape(selectedPerson.name)) : 'Selecciona una persona'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>
                                    Para Urgencias y emergencias{"\n"}llamar al <Text style={{ fontWeight: 'bold' }}>107</Text> o <Text style={{ fontWeight: 'bold' }}>911</Text>.
                                </Text>
                                <TouchableOpacity style={styles.button} onPress={iniciarConsulta}>
                                    <Text style={styles.buttonText}>Iniciar Consulta</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.botonera}>
                                <TouchableOpacity style={styles.button} onPress={handleMoreInfo}>
                                    <Text style={styles.buttonText}>Más información</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleAddFamilyMember}>
                                    <Text style={styles.buttonText}>Agregar un familiar</Text>
                                </TouchableOpacity>
                            </View>
                            <CustomModal
                                visible={modalVisible}
                                onClose={handleCloseModal}
                                title="Agregar Familiar"
                                message="Para agregar un familiar, deberá iniciar sesión en el sitio web de FABA y dirigirse a la nueva sección de Doctor FABA"
                            />
                        </>
                    ) : (
                        <View style={styles.contenido}>
                            <Text style={styles.text}>
                                Doctor FABA es un servicio de telemedicina diseñado para facilitar el acceso a consultas médicas, asesoría y seguimiento de un profesional de la salud.
                            </Text>
                            <TouchableOpacity style={styles.buttonMargin} onPress={() => Linking.openURL('http://www.faba.org.ar')}>
                                <Text style={styles.buttonText}>Registrarse</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleMoreInfo}>
                                <Text style={styles.buttonText}>Más información</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>

            {/* Modal para seleccionar persona */}
            <Modal
                visible={pickerVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closePicker}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Selecciona una persona</Text>
                        <FlatList
                            data={personas}
                            renderItem={renderItem}
                            keyExtractor={item => item.documentnumber.toString()}
                        />
                        <TouchableOpacity onPress={closePicker} style={styles.closeButton}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

background: {
        flex: 1,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(14, 113, 182, 0.3)',
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    contenido: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        width: '100%',
    },
    botonera: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
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
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    button: {
        backgroundColor: '#00b39f',
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonMargin: {
        backgroundColor: '#00b39f',
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom:20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    loadingText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    

    picker: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    pickerText: {
        fontSize: 16,
        color: '#555',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    optionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#00b39f',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
});

export default FacturanteScreen;
