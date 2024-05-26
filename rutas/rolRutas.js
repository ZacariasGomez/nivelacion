const express = require('express');
const router = express.Router();
const rolControlador = require('../controlador/rolControlador');

router.get('/filtrar', rolControlador.getTodosLosRoles);
router.post('/crear', rolControlador.crearRol);
router.put('/actualizar/:id', rolControlador.actualizarRol);
router.delete('/eliminar/:id', rolControlador.eliminarRol);

module.exports = router;
