const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Backcoin = require('../models/Backcoin');

const Retiros = db.define('retiros', {
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
		allowNull: true,
		defaultValue: ""
	},
	comprobante_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	monto: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_solicitud: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	observacion: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
	
});
// El trabajador pertenece a una oficina
Retiros.Backcoin = Retiros.belongsTo(Backcoin);
// Métodos personalizados
module.exports = Retiros;

