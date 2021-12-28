const express = require('express');
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post(
  '/',
  // Express validator
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
  ],
  usuarioController.nuevoUsuario,
);

module.exports = router;
