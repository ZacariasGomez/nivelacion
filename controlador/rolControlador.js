const Rol = require('../modelos/Rol');
const Usuario = require('../modelos/Usuario');
const sequelize = require('../config/database');
const { Op } = require('sequelize'); 

exports.getTodosLosRoles = async (peticion, respuesta) => {
    try {
        const rol = await Rol.findAll();
        respuesta.json(rol);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.crearRol = async (peticion, respuesta) => {
    try {
        const nuevoRol = await Rol.create(peticion.body);
        respuesta.status(201).json(nuevoRol);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.actualizarRol = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;

        const [rolActualizado] = await Rol.update(peticion.body,{
            where : {IdRol: id}
        });

        if (rolActualizado){
            const roles = await Rol.findByPk(id);
            respuesta.json(roles);
        } else {
            respuesta.status(404).json({mensaje: 'Rol no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarRol = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Rol.destroy({
            where : {IdRol : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Rol eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Rol no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};