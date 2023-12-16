const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "order",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        title: {type: DataTypes.STRING(255), allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: false},
        price: {type: DataTypes.DOUBLE, allowNull: false},
        minimal_step: {type: DataTypes.DOUBLE, allowNull: false},
        status: {type: DataTypes.SMALLINT, allowNull: false},
        tender_start: {type: DataTypes.DATE, allowNull: false},
        tender_stop: {type: DataTypes.DATE, allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false}
    },
    {tableName: "orders", timestamps: false, freezeTableName: true}
);