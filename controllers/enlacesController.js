const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Enlace = require('../models/Enlace');

// eslint-disable-next-line consistent-return
exports.nuevoEnlace = async (req, res, next) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Crear el enlace
  // eslint-disable-next-line camelcase
  const { nombre_original, nombre } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  // eslint-disable-next-line camelcase
  enlace.nombre_original = nombre_original;

  // Si el usuario esta autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    if (descargas) {
      enlace.descargas = descargas;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    enlace.autor = req.usuario.id;
  }

  try {
    await enlace.save();
    res.json({
      ok: true,
      msg: `${enlace.url}`,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Obtiene todos los enlaces
exports.todosEnlaces = async (req, res, next) => {
  try {
    const enlaces = await Enlace.find({}).select('url');
    console.log(enlaces);
    res.json({
      enlaces,
    });
    next();
  } catch (error) {
    console.log('Error al obtener los enlaces');
    console.log(error);
  }
};

// Retorna si el enlace tiene password
exports.tienePassword = async (req, res, next) => {
  const { url } = req.params;
  try {
    const enlace = await Enlace.findOne({ url });
    if (!enlace) {
      res.status(404).json({ msg: 'No existe el enlace' });
      next();
    }

    if (enlace.password) {
      return res.json({
        password: true,
        enlace: enlace.url,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

// Verifica que el password sea el correcto
// eslint-disable-next-line consistent-return
exports.verificarPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;
  const enlace = await Enlace.findOne({ url });
  if (bcrypt.compareSync(password, enlace.password)) {
    next();
  } else {
    return res.status(401).json({ msg: 'Password incorrecto' });
  }
};

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;
  try {
    const enlace = await Enlace.findOne({ url });
    if (!enlace) {
      res.status(404).json({ msg: 'No existe el enlace' });
      next();
    }
    res.json({
      ok: true,
      archivo: enlace.nombre,
      password: false,
    });

    next();
  } catch (error) {
    console.log(error);
  }
};
