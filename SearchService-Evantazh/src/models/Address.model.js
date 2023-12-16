const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "address",
    {
        id: {type: DataTypes.UUID, primaryKey: true},
        administrative_area_level_1: {type: DataTypes.STRING(255), allowNull: true},
        administrative_area_level_2: {type: DataTypes.STRING(255), allowNull: true},
        administrative_area_level_3: {type: DataTypes.STRING(255), allowNull: true},
        administrative_area_level_4: {type: DataTypes.STRING(255), allowNull: true},
        administrative_area_level_5: {type: DataTypes.STRING(255), allowNull: true},
        administrative_area_level_6: {type: DataTypes.STRING(255), allowNull: true},
        administrative_area_level_7: {type: DataTypes.STRING(255), allowNull: true},
        airport: {type: DataTypes.STRING(255), allowNull: true},
        colloquial_area: {type: DataTypes.STRING(255), allowNull: true},
        country: {type: DataTypes.STRING(255), allowNull: true},
        intersection: {type: DataTypes.STRING(255), allowNull: true},
        locality: {type: DataTypes.STRING(255), allowNull: true},
        natural_features: {type: DataTypes.STRING(255), allowNull: true},
        neighborhood: {type: DataTypes.STRING(255), allowNull: true},
        park: {type: DataTypes.STRING(255), allowNull: true},
        plus_code: {type: DataTypes.STRING(255), allowNull: true},
        point_of_interest: {type: DataTypes.STRING(255), allowNull: true},
        political: {type: DataTypes.STRING(255), allowNull: true},
        postal_code: {type: DataTypes.STRING(255), allowNull: true},
        premise: {type: DataTypes.STRING(255), allowNull: true},
        route: {type: DataTypes.STRING(255), allowNull: true},
        street_address: {type: DataTypes.STRING(255), allowNull: true},
        sublocality: {type: DataTypes.STRING(255), allowNull: true},
        subpremise: {type: DataTypes.STRING(255), allowNull: true},
    },
    {tableName: "addresses", timestamps: false, freezeTableName: true}
);