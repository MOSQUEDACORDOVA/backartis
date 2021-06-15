const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Banner = db.define('banner', {
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
	link: {
		type: DataTypes.TEXT,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'La link fuente es obligatorio'
			}
		}
	},
	photo: {
		type: DataTypes.TEXT,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'La photo es obligatorio'
			}
		}
	},
	nombre: {
		type: DataTypes.TEXT,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'La photo es obligatorio'
			}
		}
	},

	
	
});

// Métodos personalizados
module.exports = Banner;

