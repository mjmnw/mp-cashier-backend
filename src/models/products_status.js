"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class products_status extends Model {
        static associate({ products }) {
            this.hasMany(products, { foreignKey: "products_status_id" });
        }
    }
    products_status.init(
        {
            status: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            modelName: "products_status",
        }
    );
    return products_status;
};
