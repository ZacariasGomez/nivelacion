// const { Op } = require('sequelize'); 
const Rol = require('../modelos/Rol');
const Permiso = require('../modelos/Permiso');
const Usuario = require('../modelos/Usuario');
const sequelize = require('../config/database');
const Seq =  require('sequelize');

exports.getTodosLosUsuarios = async (peticion, respuesta) => {
    try {
        const usuarios = await  Usuario.findAll();
        respuesta.json(usuarios);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.crearUsuario = async (peticion, respuesta) => {
    try {
        const nuevoUsuario = await Usuario.create(peticion.body);
        respuesta.status(201).json(nuevoUsuario);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};
exports.actualizarUsuario = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;

        const [usuarioActualizado] = await Usuario.update(peticion.body,{
            where : {IdUsuario: id}
        });

        if (usuarioActualizado){
            const usuario = await Usuario.findByPk(id);
            respuesta.json(usuario);
        } else {
            respuesta.status(404).json({mensaje: 'Usuario no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarUsuario = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Usuario.destroy({
            where : {IdUsuario : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Usuario eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Usuario no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.getRolPorUsuario = async (peticion, respuesta) => {
    const { nombreUsuario } = peticion.params;
    try {
        // Cambiado 'Nombre' a 'nombre' para coincidir con el nombre del campo en la base de datos (asegúrate de que coincida)
        const UsuarioEncontrado = await Usuario.findOne({ where: { nombre: nombreUsuario } });
        if (!UsuarioEncontrado)
            return respuesta.status(404).json({ mensaje: 'Usuario no encontrado' });

        // Cambiado 'IdRol' a 'IdUsuario' para coincidir con la relación entre Rol y Usuario (asegúrate de que coincida)
        const todosRoles = await Rol.findAll({
            where: { IdRol: UsuarioEncontrado.IdRol }, // Corregido el campo de búsqueda
            include: [{ model: Usuario, as: 'usuario' }]
        });
        respuesta.json(todosRoles);
    } catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};


exports.contarUsuariosPorRol = async (peticion, respuesta) => {
    try {
        // Obtener los roles con la cantidad de usuarios
        const rolesConContarUsuarios = await Rol.findAll({
            attributes: [
                'IdRol',
                'Descripcion',
                [Seq.fn('COUNT', Seq.col('usuario.IdUsuario')), 'TotalUsuarios']
            ],
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: []
                }
            ],
            group: ['rol.IdRol', 'rol.Descripcion']
        });

        // Obtener todos los usuarios
        const Usuarios = await Usuario.findAll({
            attributes: ['IdUsuario', 'IdRol', 'Nombre', 'Correo', 'Clave', 'Fecha']
        });

        // Obtener todos los permisos
        const Permisos = await Permiso.findAll({
            attributes: ['idPermiso', 'IdRol', 'NombreMenu', 'Fecha']
        });

        // Combinar los datos
        const resultado = rolesConContarUsuarios.map(rol => {
            const usuariosRol = Usuarios.filter(usuario => usuario.IdRol === rol.IdRol);
            const permisosRol = Permisos.filter(permiso => permiso.IdRol === rol.IdRol);

            return {
                IdRol: rol.IdRol,
                Descripcion: rol.Descripcion,
                TotalUsuarios: rol.dataValues.TotalUsuarios,
                usuarios: usuariosRol,
                permisos: permisosRol
            };
        });

        respuesta.json(resultado);
    } catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

