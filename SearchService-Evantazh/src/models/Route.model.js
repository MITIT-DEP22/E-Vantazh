const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "route",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        is_back_direction: {type: DataTypes.BOOLEAN, allowNull: false},
        direction_json: {type: DataTypes.TEXT, allowNull: false},
        direction_mode: {type: DataTypes.SMALLINT, allowNull: false},
        route_from: {type: DataTypes.DATE, allowNull: false},
        route_to: {type: DataTypes.DATE, allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "routes", timestamps: false, freezeTableName: true}
);