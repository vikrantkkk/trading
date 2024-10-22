const { Sequelize } = require('sequelize');
const { createUserModel } = require('../models/userSchema');
const { createRateModel } = require('../models/rateSchema');

const sequelize = new Sequelize('usdt_trade_engine_nodejs', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres', // Specifies the database type
});

// Initialize models
const UserModel = createUserModel(sequelize);
const RateModel = createRateModel(sequelize);

// Sync all models
const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // Sync all models
        console.log("Database and tables created successfully");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};



// Export the models
module.exports = {
    initDb,
    sequelize,
    UserModel,
    RateModel
};
