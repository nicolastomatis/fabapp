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

    try {
        // Enviamos la solicitud POST al servicio SOAP
        const response = await axios.post(`${baseUrl}/IniciarSesion`, `user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.send(response.data);
    } catch (error) {
        console.error('Error al comunicarse con el servicio SOAP:', error);
        res.status(500).send('Error al comunicarse con el servicio SOAP');
    }
});

app.post('/TraerNormaMutual', async (req, res) => {
    const { token, user, mutual } = req.body;

    try {
        // Enviamos la solicitud POST al servicio SOAP
        const response = await axios.post(`${baseUrl}/TraerNormaMutual`, `token=${encodeURIComponent(token)}&user=${encodeURIComponent(user)}&mutual=${encodeURIComponent(mutual)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.send(response.data);
    } catch (error) {
        console.error('Error al comunicarse con el servicio SOAP:', error);
        res.status(500).send('Error al comunicarse con el servicio SOAP');
    }
});

app.post('/TraerNovedades', async (req, res) => {
    const { token, user } = req.body;

    try {
        // Enviamos la solicitud POST al servicio SOAP
        const response = await axios.post(`${baseUrl}/TraerNovedades`, `token=${encodeURIComponent(token)}&user=${encodeURIComponent(user)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Envía la respuesta de vuelta al cliente
        res.send(response.data);
    } catch (error) {
        console.error('Error al comunicarse con el servicio SOAP:', error);
        res.status(500).send('Error al comunicarse con el servicio SOAP');
    }
});

app.listen(port, () => {
});
