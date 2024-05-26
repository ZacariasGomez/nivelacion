const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define('rol',{
    IdRol : {
        type :  DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true       
    },
  
    Descripcion : {
        type : DataTypes.STRING,
        allowNull: false
    },
   
    Fecha:{
        type : DataTypes.DATE,
        allowNull: false
    }
},{ freezeTableName: true });

// Rol.hasMany(Permiso, { foreignKey: 'IdRol', as: 'permiso' });

module.exports = Rol;