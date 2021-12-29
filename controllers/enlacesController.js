const shortid = require('shortid');
const bcrypt = require('bcrypt');
const Enlace = require('../models/Enlace');

exports.nuevoEnlace = async (req, res, next) => {
  // Revisar si hay errores

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
