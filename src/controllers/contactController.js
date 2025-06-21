const db = require('../config/db');

exports.submitContactForm = async (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO contactos (nombre, correo, telefono, mensaje) VALUES (?, ?, ?, ?)',
      [nombre, correo, telefono, mensaje]
    );

    return res.status(201).json({
      message: 'Formulario guardado correctamente',
      data: { id: result.insertId, nombre, correo, telefono, mensaje },
    });
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
