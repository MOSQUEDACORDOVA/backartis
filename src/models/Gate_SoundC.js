const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Gates = require('../models/Gate');

const Gate_SoundC = db.define('gate_soundc', {
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
	id_gate: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El id gate es obligatorio'
			}
		}
	},
		track_id: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},	title: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},permalink_url: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},	
	descargas: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	
});
// El trabajador pertenece a una oficina
Gate_SoundC.Gates = Gate_SoundC.belongsTo(Gates);
// Métodos personalizados
module.exports = Gate_SoundC;

