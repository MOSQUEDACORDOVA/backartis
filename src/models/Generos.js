const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Generos = db.define('generos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	genero: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
	
});

// Métodos personalizados
module.exports = Generos;

