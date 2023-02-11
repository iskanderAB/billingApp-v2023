const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'sqliteStock', {
    dialect: 'sqlite',
    storage: 'dataBase.sqlite'
});


module.exports = sequelize;
