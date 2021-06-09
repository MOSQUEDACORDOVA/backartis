const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Gates = db.define('gates', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tipo_create: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El id_usuario es obligatorio'
			}
		}
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
	url_fuente: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La URL fuente es obligatorio'
			}
		}
	},
	genero: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El genero es obligatorio'
			}
		}
	},
	archivo: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 0
	},
	nombre_artista: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre de artista es obligatorio'
			}
		}
	},
	titulo: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El titulo es obligatorio'
			}
		}
	},
	descripcion: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La descripcion es obligatoria'
			}
		}
	},
	tema: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El tema es obligatorio'
			}
		}
	},
	imagen: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 0
	},
	color: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 0
	},
	color_titulo: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 0
	},
	color_descrip: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 0
	},
	privacidad: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La privacidad es obligatorio'
			}
		}
	},

	enlace_perzonalizado: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El enlace es obligatorio'
			}
		}
	},	
	fecha_registro: {
		type: DataTypes.DATE
	},
	otro_gender: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	nuevo_lanzamiento: {
		type: DataTypes.STRING,
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
	},	seguir_mixcloud: {
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
	},descargas: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	
});

// Métodos personalizados
module.exports = Gates;

