const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Modal_land = db.define('modal_land', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	titulo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	img: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	link: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
});

// Métodos personalizados
module.exports = Modal_land;

