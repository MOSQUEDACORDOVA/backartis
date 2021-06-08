const { Sequelize } = require('sequelize');
sequelize = null;
const DATABASE_URL= "https://data.heroku.com/datastores/a0f1f5e0-f1dc-46f6-86e1-c3d5703c351a"
// checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres'
  })
}


module.exports = db;
