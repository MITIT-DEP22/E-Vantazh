const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "cargo",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        title: {type: DataTypes.STRING(255), allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: false},
        type: {type: DataTypes.SMALLINT, validate: {min: 0, max: 7}},
        weight: {type: DataTypes.DOUBLE, allowNull: true},
        volume: {type: DataTypes.DOUBLE, allowNull: true},
        passengers_capacity: {type: DataTypes.INTEGER, allowNull: true},
        dimension_height: {type: DataTypes.INTEGER, allowNull: true},
        dimension_width: {type: DataTypes.INTEGER, allowNull: true},
        dimension_length: {type: DataTypes.INTEGER, allowNull: true},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "cargos", timestamps: false, freezeTableName: true}
);