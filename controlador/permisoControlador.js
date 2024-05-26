const Permiso = require('../modelos/Permiso');
const Usuario = require('../modelos/Usuario');
const sequelize = require('../config/database');
const { Op } = require('sequelize'); 

exports.getTodosLosPermisos = async (peticion, respuesta) => {
    try {
        const permiso = await Permiso.findAll();
        respuesta.json(permiso);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.crearPermiso = async (peticion, respuesta) => {
    try {
        const nuevoPermiso = await Permiso.create(peticion.body);
        respuesta.status(201).json(nuevoPermiso);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.actualizarPermiso = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;

        const [permisoActualizado] = await Permiso.update(peticion.body,{
            where : {IdPermiso: id}
        });

        if (permisoActualizado){
            const permisos = await Permiso.findByPk(id);
            respuesta.json(permisos);
        } else {
            respuesta.status(404).json({mensaje: 'Permiso no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarPermiso = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Permiso.destroy({
            where : {IdPermiso : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Permiso eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Permiso no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};