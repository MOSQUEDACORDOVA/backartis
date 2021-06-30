const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userName: {
		type: DataTypes.STRING(60),
		unique: {
			args: true,
			msg: 'Usuario ya registrado'
		}
	},
	photo: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 0
	},
	email: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Agrega un correo válido'
			},
			notEmpty: {
				msg: 'El email es obligatorio'
			}
		},
		unique: {
			args: true,
			msg: 'Usuario ya registrado'
		}
	},
	password: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La contraseña es obligatoria'
			}
		}
	},
	name: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
	},
	lastName: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El apellido es obligatorio'
			}
		}
	},
	tipo: {
		type: DataTypes.STRING(90),
		allowNull: false,
		defaultValue: 'Normal'
	},
	membership: {
		type: DataTypes.STRING(60),
		allowNull: false,
		defaultValue: 'Basic'
	},
	backcoins: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0
	},
	token: {
		type: DataTypes.STRING
	},
	expiration: {
		type: DataTypes.DATE
	},
	modo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	desde: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	hasta: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: ""
	},
	metodo_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
}, {
	hooks: {
		beforeCreate(usuario) {
			usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
			usuario.userName = '@' + usuario.email.split('@')[0];
		}
	}
});

// Métodos personalizados
Usuarios.prototype.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}



module.exports = Usuarios;

