const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Tipo_cambio = db.define('tipo_cambio', {
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
	tipo_cambio: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
	},
	
	
	
});

// Métodos personalizados
module.exports = Tipo_cambio;

