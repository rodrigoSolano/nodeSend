const shortid = require('shortid');
const Enlace = require('../models/Enlace');

exports.nuevoEnlace = async (req, res, next) => {
  // Revisar si hay errores

  // Si el usuario esta autenticado

  // Crear el enlace
  // eslint-disable-next-line camelcase
  const { nombre_original, password } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  // eslint-disable-next-line camelcase
  enlace.nombre_original = nombre_original;
  enlace.password = password;
  console.log(enlace);
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
