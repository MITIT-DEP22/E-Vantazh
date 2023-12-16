const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "point",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        sequence: {type: DataTypes.INTEGER, allowNull: false},
        formatted_address: {type: DataTypes.STRING(255), allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "points", timestamps: false, freezeTableName: true}
);