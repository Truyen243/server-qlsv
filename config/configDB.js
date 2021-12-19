const {Sequelize} = require('sequelize');
require('dotenv').config();
const data =require('../router.json');
const customConfig = {
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": false,
    "timezone": "+07:00"
};

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, customConfig);

let routesConnectDB = async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send(JSON.stringify(data));
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
}

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {
    connectDB: connectDB,
    routesConnectDB: routesConnectDB
};