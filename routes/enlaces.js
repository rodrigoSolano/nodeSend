const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const enlacesController = require('../controllers/enlacesController');
const auth = require('../middleware/auth');

router.post('/', auth, enlacesController.nuevoEnlace);

module.exports = router;
