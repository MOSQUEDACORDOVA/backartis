const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Gate_SoundC = require('../models/Gate_SoundC');
// make sure db/client/connection can support emoji
db.query("SET NAMES utf8mb4;");
// confirm settings
db.query("SHOW VARIABLES LIKE 'character_set_%'").then(function(data) {
    //console.log("entro aqui");
	//console.log(data);
});
const Gates = db.define('gates', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tipo_create: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	url_fuente: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	genero: {
		type: DataTypes.TEXT,
		allowNull: true,
		
	},
	archivo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	nombre_artista: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	titulo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	tema: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	imagen: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	color: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	color_titulo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	color_descrip: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	privacidad: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	enlace_perzonalizado: {
		type: DataTypes.TEXT,
		allowNull: false,
	},	
	fecha_registro: {
		type: DataTypes.DATE
	},
	otro_gender: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	fecha_programa: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	omitir_correo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	url_track: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	music_price: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	show_watermarker: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	user_logo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	suscribir_youtube: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_youtube: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_youtube: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	nombre_youtube: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	like_facebook: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	compartir_facebook: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_facebook: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_facebook: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	seguir_twitter: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	compartir_twitter: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_twitter: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_twitter: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	seguir_soundcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	compartir_soundcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	repost_souncloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_souncloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	url_souncloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	seguir_instagram: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_instagram: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_instagram: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	seguir_spotify: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_spotify: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_spotify: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	seguir_deezer: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	guardar_deezer: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_deezer: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_deezer: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	seguir_tiktok: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_tiktok: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	
	url_tiktok: {
		type: DataTypes.TEXT,
		allowNull: true,
	},seguir_mixcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	repost_mixcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	like_mixcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	omitir_mixcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	url_mixcloud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	seguir_twitch: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	omitir_twitch: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	url_twitch: {
		type: DataTypes.TEXT,
		allowNull: true,
	},seguir_applemusic: {
		type: DataTypes.TEXT,
		allowNull: true,
	},omitir_applemusic: {
		type: DataTypes.TEXT,
		allowNull: true,
	},url_applemusic: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	descargas: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	correos: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	vista: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	
	
},  {
	charset: 'utf8mb4', /* i add this two ligne here for generate the table with collation  = 'utf8_general_ci' test it and tell me ? */
collate: 'utf8mb4_unicode_ci'});

// El trabajador pertenece a una oficina
Gates.Gate_SoundC= Gates.belongsTo(Gate_SoundC);
// Métodos personalizados
module.exports = Gates;

