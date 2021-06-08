const { Sequelize } = require('sequelize');

// Variables desde variables.env
//require('dotenv').config({path: 'variables.env'});

DB_NAME="heroku_d3ab0a1b9873300";
DB_USER="bef9a651ee054d";
DB_PASS="7139c364";
DB_HOST="us-cdbr-east-04.cleardb.com";
DB_PORT=5432;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		//port: DB_PORT,
		dialect: 'mysql'
	});

module.exports = db;
