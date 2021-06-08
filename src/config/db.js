const { Sequelize } = require('sequelize');
sequelize = null;
const DATABASE_URL= "postgres://egpijhnywrkodb:608bf8c663808da183e47320dfc52887d8756c2fde0276bf7ed37c941b525d4e@ec2-34-193-101-0.compute-1.amazonaws.com:5432/de69n41tmrgc7t"
// checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres'
  })
}


module.exports = db;
