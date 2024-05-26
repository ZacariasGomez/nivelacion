const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controlador/usuarioControlador');

router.get('/filtrar', usuarioControlador.getTodosLosUsuarios);
router.post('/crear', usuarioControlador.crearUsuario);
router.put('/actualizar/:id', usuarioControlador.actualizarUsuario);
router.delete('/eliminar/:id', usuarioControlador.eliminarUsuario);

//REPORTES
// router.get('/filtro/:nombreUsuario', usuarioControlador.filtrarUsuarioPorNombre);
// // reporte2
router.get('/contarUsuario', usuarioControlador.contarUsuariosPorRol);
// BUSCAR VERSICULOS DE UN LIBRO : NUMEROS
router.get('/:nombreUsuario', usuarioControlador.getRolPorUsuario);

module.exports = router;