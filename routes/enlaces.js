const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const enlacesController = require('../controllers/enlacesController');
const auth = require('../middleware/auth');

router.post(
  '/',
  check('nombre', 'El nombre es obligatorio, sube un archivo').not().isEmpty(),
  check('nombre_original', 'El nombre original es obligatorio').not().isEmpty(),
  auth,
  enlacesController.nuevoEnlace,
);

router.get('/', enlacesController.todosEnlaces);

router.get(
  '/:url',
  enlacesController.tienePassword,
  enlacesController.obtenerEnlace,
);

router.post(
  '/:url',
  enlacesController.verificarPassword,
  enlacesController.obtenerEnlace,
);

module.exports = router;
