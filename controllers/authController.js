const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config({ path: 'variables.env' });

exports.autenticarUsuario = async (req, res, next) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array });
    return next(); // para que no siga ejecutando el codigo
  }

  // Buscar el usuario por email
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  // Si no existe usuario con ese email
  if (!usuario) {
    res.status(401).json({ msg: 'El usuario no existe' });
    return next(); // para que no siga ejecutando el codigo
  }

  // Revisar si el password es correcto
  if (bcrypt.compareSync(password, usuario.password)) {
    // Crear JWT
    const token = jwt.sign({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
    }, process.env.SECRET_KEY, {
      expiresIn: '8h',
    });

    // Enviar el JWT en la respuesta
    res.status(200).json({ token });
  } else {
    res.status(401).json({ msg: 'El password es incorrecto' });
  }

  return next();
};

exports.usuarioAutenticado = async (req, res) => {
  res.json({ usuario: req.usuario });
};
