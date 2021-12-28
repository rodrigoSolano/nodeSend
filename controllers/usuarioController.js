const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

exports.nuevoUsuario = async (req, res) => {
  // mostrar mensajes de error de express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // vefificar si el usuario esta registrado
  const { email, password } = req.body;

  let usuario = await Usuario.findOne({ email });

  if (usuario) {
    return res.status(400).json({
      msg: 'El usuario ya esta registrado',
    });
  }

  // crear el nuevo usuario
  usuario = new Usuario(req.body);
  // hashear el password
  const salt = await bcrypt.genSalt(20);
  usuario.password = await bcrypt.hash(password, salt);
  await usuario.save();
  return res.json({ msg: 'Usuario creado correctamente' });
};
