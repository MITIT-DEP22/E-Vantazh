const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "location",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        latitude: {type: DataTypes.DOUBLE, allowNull: false},
        longitude: {type: DataTypes.DOUBLE, allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "locations", timestamps: false, freezeTableName: true}
);