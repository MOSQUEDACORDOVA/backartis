const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
db.query("SET NAMES utf8mb4;");
// confirm settings
db.query("SHOW VARIABLES LIKE 'character_set_%'").then(function(data) {
    //console.log("entro aqui");
	//console.log(data);
});

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
	
}, {
	charset: 'utf8mb4', /* i add this two ligne here for generate the table with collation  = 'utf8_general_ci' test it and tell me ? */
collate: 'utf8mb4_unicode_ci'});

// Métodos personalizados
module.exports = Gate_SoundC;

