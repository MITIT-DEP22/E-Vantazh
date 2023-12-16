const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "route_distance",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        distance_string: {type: DataTypes.STRING(255), allowNull: false},
        distance: {type: DataTypes.INTEGER, allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "route_distances", timestamps: false, freezeTableName: true}
);