const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Obtener el token
    const token = authHeader.split(' ')[1];
    // Verificar el token
    try {
      const usuario = jwt.verify(token, process.env.SECRET_KEY);
      req.usuario = usuario;
    } catch (error) {
      res.status(401).json({ msg: 'Token no valido' });
    }
  }
  return next();
};
