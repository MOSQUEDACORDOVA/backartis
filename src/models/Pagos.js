const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Pagos = db.define('pagos', {
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
	status: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El status es obligatorio'
			}
		}
	},
	numero_referencia: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El numero es obligatorio'
			}
		}
	},
	monto: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo_compra: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	metodo_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
	
});

// Métodos personalizados
module.exports = Pagos;

