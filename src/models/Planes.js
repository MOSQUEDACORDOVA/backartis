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
		allowNull: true,
	},
	linea2: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea3: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea4: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea5: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea6: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea7: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea8: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea9: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	linea10: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	descuento: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	detalles: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
});

// Métodos personalizados
module.exports = Planes;

