const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Planes = db.define('planes', {
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
	tipo_create: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El tipo es obligatorio'
			}
		}
	},
	costo: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El costo es obligatorio'
			}
		}
	},
	modo: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La modalidad es obligatorio'
			}
		}
	},
	linea1: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea2: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea3: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea4: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea5: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea6: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea7: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea8: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea9: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	linea10: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	descuento: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	fecha_registro: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	
	
});

// Métodos personalizados
module.exports = Planes;

