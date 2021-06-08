const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Sobre_nosotros = db.define('sobre_nosotros', {
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
	telefono: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El telefono es obligatorio'
			}
		}
	},
	ws: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El ws es obligatorio'
			}
		}
	},
	facebook: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	instagram: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	soundcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	mixcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	youtube: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	correo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	twitter: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	spotify: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tiktok: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
});

// Métodos personalizados
module.exports = Sobre_nosotros;

