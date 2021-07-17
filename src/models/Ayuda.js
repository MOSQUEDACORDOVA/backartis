const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Ayuda = db.define('ayuda', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""

	},
	terminos: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	politicas: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	preguntas: {
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

// Métodos personalizados
module.exports = Ayuda;

