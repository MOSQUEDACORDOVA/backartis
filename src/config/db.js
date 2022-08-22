const { Sequelize } = require('sequelize');

// Variables desde variables.env
//require('dotenv').config({path: 'variables.env'});

DB_NAME="backartist";
DB_USER="root";
DB_PASS="";
DB_HOST="localhost";
DB_PORT=3306;

// DB_NAME="backarti_backartis";
// DB_USER="backarti_backartist";
// DB_PASS="0.Jw&)E4IFmc";
// DB_HOST="localhost";
// DB_PORT=3306;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		//port: DB_PORT,
		dialect: 'mysql',
	define: {
			charset: 'utf8',
			collate: 'utf8_general_ci', // this work
		  },
	});

module.exports = db;
