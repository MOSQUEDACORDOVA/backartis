const { Sequelize } = require('sequelize');

// Variables desde variables.env
require('dotenv').config({path: 'variables.env'});

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres         database
sequelize =new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL,
 {
   dialect: "postgres",
   protocol: "postgres",
   port: 5432,
   host: "ec2-34-193-101-0.compute-1.amazonaws.com",
   logging: true //false
});
} else {
// the application is executed on the local machine ... use mysql
DB_NAME="de69n41tmrgc7t";
DB_USER="egpijhnywrkodb";
DB_PASS="608bf8c663808da183e47320dfc52887d8756c2fde0276bf7ed37c941b525d4e";
DB_HOST="ec2-34-193-101-0.compute-1.amazonaws.com";
DB_PORT=5432;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'postgres'
	});

}


module.exports = db;
