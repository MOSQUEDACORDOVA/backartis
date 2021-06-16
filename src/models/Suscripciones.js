const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Suscirpciones = db.define('sucripciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	id_gate: {
		type: DataTypes.INTEGER,
		allowNull: true,

	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	correo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
	
});

// Métodos personalizados
module.exports = Suscirpciones;

