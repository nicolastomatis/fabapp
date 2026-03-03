const functions = require("firebase-functions");
const axios = require("axios");

const baseUrl = "http://www.fabawsmobile.faba.org.ar/Service1.asmx";

exports.iniciarSesion = functions.https.onRequest(async (req, res) => {
  const {user, password} = req.body;

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
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});

exports.traerNormaMutual = functions.https.onRequest(async (req, res) => {
  const {token, user, mutual} = req.body;

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
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});

exports.traerNovedades = functions.https.onRequest(async (req, res) => {
  const {token, user} = req.body;

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
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});

exports.DrFABATraerFacturante = functions.https.onRequest(async (req, res) => {
  const {token, idusuario} = req.body;


  try {
    const response = await axios.post(
        `${baseUrl}/DrFABATraerFacturante`,
        `token=${encodeURIComponent(token)}&` +
        `idusuario=${encodeURIComponent(idusuario)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error al comunicarse con el servicio SOAP:", error);
    res.status(500).send("Error al comunicarse con el servicio SOAP");
  }
});
