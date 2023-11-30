const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: '5hiego3vom401wqma481',
    password: 'pscale_pw_hLjozdKMnTCLo2SweLRMq7B50f0ueor8GiOsflzK7lx',
    database: 'errores_camiones',
    ssl:{"rejectUnauthorized":true}
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

// Ruta para crear un nuevo error
app.post('/errores', (req, res) => {
  const { numero, color, descripcion, accion } = req.body;

  if (!numero || !color || !descripcion || !accion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const insertQuery = `INSERT INTO errores (numero, color, descripcion, accion) VALUES (?, ?, ?, ?)`;
  const values = [numero, color, descripcion, accion];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Error creado con éxito:', result);
      res.status(201).json({ message: 'Error creado con éxito' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
