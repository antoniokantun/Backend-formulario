const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const { validateContactForm } = require('../validations/contactValidation');

router.post('/', validateContactForm, submitContactForm);

module.exports = router;
