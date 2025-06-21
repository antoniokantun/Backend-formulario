const { body, validationResult } = require('express-validator');

exports.validateContactForm = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Correo inválido'),

  body('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isMobilePhone().withMessage('Número de teléfono inválido'),

  body('mensaje')
    .notEmpty().withMessage('El mensaje es obligatorio')
    .isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];
