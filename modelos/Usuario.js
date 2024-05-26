
const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./Rol');

const Usuario = sequelize.define('usuario',{

    IdUsuario : {
        type :  DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true       
    },
    IdRol : {
        type :  DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Rol,
            key : 'IdRol'
        }      
    },
    Nombre: {
        type : DataTypes.STRING,
        allowNull: false
    },
    Correo :{
        type : DataTypes.STRING,
        allowNull : false
    },
    Clave :{
        type : DataTypes.STRING,
        allowNull : false
    },
    Fecha:{
        type : DataTypes.DATE,
        allowNull: false
    }
}, { freezeTableName: true });


Usuario.belongsTo(Rol, { foreignKey: 'IdRol', as: 'rol' });
Rol.hasMany(Usuario,{ foreignKey: 'IdRol', as: 'usuario' });

module.exports = Usuario;