const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('url_shortner_app', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect:'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Mysql connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;