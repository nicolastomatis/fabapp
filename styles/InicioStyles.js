import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
        padding: 20,
    },
    facturacionButton: {
        width: '100%',
        height: 150,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden', // Asegura que la imagen no se salga del botón
        justifyContent: 'left',
        borderColor: 'gray',
        borderWidth: 0,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        paddingLeft: 20,
    },
    section: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    listItems: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitleSection: {
        fontSize: 26,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#7E7E7E',
    },
    list: {
        justifyContent: 'space-between',
        width: '100%',
    },
    item: {
        flex: 1,
        margin: 5,
        backgroundColor: '#009D96',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRadius: 10,
    },
    siglas: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    codigo: {
        fontSize: 6,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#FF893E',
        textAlign: 'center',
        width: '100%',
    },
    verMasButtonItem: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FF893E',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'right',
    },
    textoButtonItem: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

});
