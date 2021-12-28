const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post(
  '/',
  [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password no puede ir vacio').not().isEmpty(),
  ],
  authController.autenticarUsuario,
);

router.get(
  '/',
  auth,
  authController.usuarioAutenticado,
);

module.exports = router;
