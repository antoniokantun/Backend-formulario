const db = require('../config/db');
const axios = require('axios');

exports.submitContactForm = async (req, res) => {
  const { nombre, correo, telefono, mensaje, recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'Token de reCAPTCHA faltante' });
  }

  try {
    // Validar reCAPTCHA v2 con Google
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    if (!data.success || data.score < 0.5) {
      return res.status(403).json({ message: 'Fallo la verificación de reCAPTCHA' });
    }

    // Guardar en la base de datos
    const [result] = await db.execute(
      'INSERT INTO contactos (nombre, correo, telefono, mensaje) VALUES (?, ?, ?, ?)',
      [nombre, correo, telefono, mensaje]
    );

    return res.status(201).json({
      message: 'Formulario enviado y verificado correctamente',
      data: { id: result.insertId, nombre, correo, telefono, mensaje },
    });

  } catch (error) {
    console.error('Error en verificación o guardado:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
