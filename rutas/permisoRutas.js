const express = require('express');
const router = express.Router();
const permisoControlador = require('../controlador/permisoControlador');

router.get('/filtrar', permisoControlador.getTodosLosPermisos);
router.post('/crear', permisoControlador.crearPermiso);
router.put('/actualizar/:id', permisoControlador.actualizarPermiso);
router.delete('/eliminar/:id', permisoControlador.eliminarPermiso);

module.exports = router;