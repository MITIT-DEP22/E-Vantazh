const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "user",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        first_name: {type: DataTypes.STRING(255), allowNull: false},
        last_name: {type: DataTypes.STRING(255), allowNull: false},
        email: {type: DataTypes.STRING(255), allowNull: false},
        password: {type: DataTypes.STRING(255), allowNull: false},
        company_name: {type: DataTypes.STRING(255), allowNull: false},
        phone: {type: DataTypes.STRING(255), allowNull: false},
        role: {type: DataTypes.STRING(255), allowNull: false},
        rating: {type: DataTypes.DOUBLE, allowNull: false},
        is_enabled: {type: DataTypes.BOOLEAN, allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "users", timestamps: false, freezeTableName: true}
);