const express = require('express');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// Conectar con la base de datos
conectarDB();

console.log('Iniciando NodeSend');

// puerto de la app
const port = process.env.PORT || 4000;

// rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
