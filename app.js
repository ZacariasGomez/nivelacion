const express = require('express');
const usuarioRutas = require('./rutas/usuarioRutas');
const rolRutas = require('./rutas/rolRutas');
const permisoRutas = require('./rutas/permisoRutas');
const app = express();
//middleware
app.use(express.json());

//Rutas
app.use('/api/usuario',usuarioRutas);
app.use('/api/rol',rolRutas);
app.use('/api/permisos',permisoRutas);

//levantar el servidor
const PORT = 5001;
app.listen(PORT, () => {
    console.log('Servidor levantado http://localhost:'+PORT);
});