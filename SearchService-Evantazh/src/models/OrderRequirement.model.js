const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

const OrderRequirement = sequelize.define(
    "order_requirement",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        requirement: {type: DataTypes.TEXT, allowNull: false}
    },
    {tableName: "order_requirements", timestamps: false, freezeTableName: true}
);

module.exports = OrderRequirement;