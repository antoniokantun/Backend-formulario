const Joi = require('joi');

const contactSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
  }),
  correo: Joi.string().email().required().messages({
    'string.email': 'El correo no es válido',
    'any.required': 'El correo es obligatorio',
  }),
  telefono: Joi.string()
    .pattern(/^[0-9\s()+-]+$/)
    .min(7)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': 'El teléfono contiene caracteres no válidos',
      'string.empty': 'El teléfono es obligatorio',
    }),
  mensaje: Joi.string().trim().min(10).required().messages({
    'string.min': 'El mensaje debe tener al menos 10 caracteres',
    'string.empty': 'El mensaje es obligatorio',
  }),
  recaptchaToken: Joi.string().optional(), // si estás usando reCAPTCHA
});

exports.validateContactForm = (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body, {
    abortEarly: false, // para mostrar todos los errores
    stripUnknown: true // elimina campos no definidos en el schema
  });

  if (error) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errores: error.details.map(e => e.message),
    });
  }

  req.body = value; // datos validados y sanitizados
  next();
};
