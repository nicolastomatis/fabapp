const functions = require("firebase-functions");
const axios = require("axios");

const baseUrl = "http://www.fabawsmobile.faba.org.ar/Service1.asmx";

exports.iniciarSesion = functions.https.onRequest(async (req, res) => {
  const {user, password} = req.body;

  console.log("Iniciando solicitud al servicio SOAP...");
  console.log("Datos de usuario:", {user, password});

  try {
    const response = await axios.post(
        `${baseUrl}/IniciarSesion`,
        `user=${encodeURIComponent(user)}` +
      `&password=${encodeURIComponent(password)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
    );
    console.log("Respuesta cruda del servicio SOAP:", response.data);
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});

exports.traerNormaMutual = functions.https.onRequest(async (req, res) => {
  const {token, user, mutual} = req.body;

  console.log("Enviando solicitud al servicio SOAP...");
  console.log("Datos:", {token, user, mutual});

  try {
    const response = await axios.post(
        `${baseUrl}/TraerNormaMutual`,
        `token=${encodeURIComponent(token)}` +
      `&user=${encodeURIComponent(user)}` +
      `&mutual=${encodeURIComponent(mutual)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
    );
    console.log("Respuesta cruda del servicio SOAP:", response.data);
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});

exports.traerNovedades = functions.https.onRequest(async (req, res) => {
  const {token, user} = req.body;

  console.log("Enviando solicitud al servicio SOAP para TraerNovedades...");
  console.log("Datos:", {token, user});

  try {
    const response = await axios.post(
        `${baseUrl}/TraerNovedades`,
        `token=${encodeURIComponent(token)}` +
      `&user=${encodeURIComponent(user)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
    );
    console.log("Respuesta cruda del servicio SOAP:", response.data);
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});
