const express = require('express');
const axios = require('axios'); // Utilizamos Axios para hacer la solicitud POST
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// URL base del servicio SOAP
const baseUrl = 'http://www.fabawsmobile.faba.org.ar/Service1.asmx';

app.post('/IniciarSesion', async (req, res) => {
    const { user, password } = req.body;

    console.log('Iniciando solicitud al servicio SOAP...');
    console.log('Datos de usuario:', { user, password });

    try {
        // Enviamos la solicitud POST al servicio SOAP
        const response = await axios.post(`${baseUrl}/IniciarSesion`, `user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Respuesta cruda del servicio SOAP:', response.data);

        res.send(response.data);
    } catch (error) {
        console.error('Error al comunicarse con el servicio SOAP:', error);
        res.status(500).send('Error al comunicarse con el servicio SOAP');
    }
});

app.post('/TraerNormaMutual', async (req, res) => {
    const { token, user, mutual } = req.body;

    console.log('Enviando solicitud al servicio SOAP...');
    console.log('Datos:', { token, user, mutual });

    try {
        // Enviamos la solicitud POST al servicio SOAP
        const response = await axios.post(`${baseUrl}/TraerNormaMutual`, `token=${encodeURIComponent(token)}&user=${encodeURIComponent(user)}&mutual=${encodeURIComponent(mutual)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Respuesta cruda del servicio SOAP:', response.data);

        res.send(response.data);
    } catch (error) {
        console.error('Error al comunicarse con el servicio SOAP:', error);
        res.status(500).send('Error al comunicarse con el servicio SOAP');
    }
});

app.post('/TraerNovedades', async (req, res) => {
    const { token, user } = req.body;

    console.log('Enviando solicitud al servicio SOAP para TraerNovedades...');
    console.log('Datos:', { token, user });

    try {
        // Enviamos la solicitud POST al servicio SOAP
        const response = await axios.post(`${baseUrl}/TraerNovedades`, `token=${encodeURIComponent(token)}&user=${encodeURIComponent(user)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Respuesta cruda del servicio SOAP:', response.data);

        // Envía la respuesta de vuelta al cliente
        res.send(response.data);
    } catch (error) {
        console.error('Error al comunicarse con el servicio SOAP:', error);
        res.status(500).send('Error al comunicarse con el servicio SOAP');
    }
});

app.listen(port, () => {
    console.log(`Servidor API REST escuchando en http://localhost:${port}`);
});
