const express = require('express');

const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const archivosController = require('../controllers/archivosController');

// Subida de archivos
const upload = multer({
  dest: './uploads/',
});

router.post(
  '/',
  upload.single('archivo'),
  archivosController.subirArchivo,
);

router.delete(
  '/:id',
  auth,
  archivosController.eliminarArchivo,
);

module.exports = router;
