const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// Conectar con la base de datos
conectarDB();

// Habilitar Cors
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

console.log('Iniciando NodeSend');

// puerto de la app
const port = process.env.PORT || 4000;

// Uso de json
app.use(express.json());

// rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
