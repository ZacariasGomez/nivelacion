const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Rol = require('./Rol');

const Permiso = sequelize.define('permiso',{
   
    idPermiso : {
        type :  DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true      
    },
    IdRol:{
        type: DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Rol,
            key : 'IdRol'
        }
    },
  
    NombreMenu : {
        type : DataTypes.STRING,
        allowNull: false
    },
   
    Fecha:{
        type : DataTypes.DATE,
        allowNull: false
    }
},{ freezeTableName: true });


Permiso.belongsTo(Rol, { foreignKey: 'IdRol', as: 'rol' });
Rol.hasMany(Permiso,{ foreignKey: 'IdRol', as: 'permiso' });
 
module.exports = Permiso;