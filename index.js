const express = require('express');

// crear el servidor
const app = express();

console.log('Iniciando NodeSend');

// puerto de la app
const port = process.env.PORT || 4000;

// arrancar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
