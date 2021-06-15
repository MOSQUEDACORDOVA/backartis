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
	cantidad: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
	},
	monto: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El numero es obligatorio'
			}
		}
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
	cantidad: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
	
});

// Métodos personalizados
module.exports = Backcoin;

