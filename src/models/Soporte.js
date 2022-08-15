const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('../models/Usuarios');

const Soporte = db.define('soporte', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	correo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""

	},
	nombre: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	adjunto: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	respuestas: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
	
});
Soporte.Usuarios = Soporte.belongsTo(Usuarios);

// Métodos personalizados
module.exports = Soporte;

