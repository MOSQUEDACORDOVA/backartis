const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Backcoin = db.define('backcoin', {
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
	nombre_apellido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo_documento: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	n_documento: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	correo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	monto: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: ""
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	comprobante: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	metodo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	pais: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	banco: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cuenta: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	origen: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
});

// Métodos personalizados
module.exports = Backcoin;

