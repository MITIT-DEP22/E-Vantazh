const {Sequelize} = require("sequelize");
const DatabaseConfig = require("../config/database.config");

const sequelize = new Sequelize(
    DatabaseConfig.DATABASE_NAME,
    DatabaseConfig.DATABASE_USER,
    DatabaseConfig.DATABASE_PASSWORD,
    DatabaseConfig.DATABASE_OPTIONS,
);

sequelize.authenticate()
    .then(() => console.log("Connection has been established successfully"))
    .catch(err => console.log(`Unable to connect to the database: ${err}`));

module.exports = {sequelize};