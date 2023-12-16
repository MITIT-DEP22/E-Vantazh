const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "route_duration",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        duration: {type: DataTypes.INTEGER, allowNull: false},
        duration_string: {type: DataTypes.STRING(255), allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "route_duration", timestamps: false, freezeTableName: true}
);