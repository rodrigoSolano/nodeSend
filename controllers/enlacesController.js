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
  const { nombre_original } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
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
    });

    // Si las descargas son iguales a 1  - BORRAR

    // Restar una descarga al enlace

    next();
  } catch (error) {
    console.log(error);
  }
};
