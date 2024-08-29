import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        width: '100%',
        padding: 20,
        backgroundColor: '#009D96',
        marginBottom: 20,
        borderRadius: 20,
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
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    textoDescripcion: {
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 18,
        color: 'grey',
    },
});
