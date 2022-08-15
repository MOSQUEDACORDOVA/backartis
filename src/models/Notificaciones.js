const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Notificaciones = db.define('notificaciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El id_usuario es obligatorio'
			}
		}
	},
	nombre: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_inicio: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
		fecha_final: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	destino: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},

	
	
});

// Métodos personalizados
module.exports = Notificaciones;

