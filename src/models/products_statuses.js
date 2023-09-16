"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class products_statuses extends Model {
        static associate({ products }) {
            this.hasMany(products, { foreignKey: "products_statuses_id" });
        }
    }
    products_statuses.init(
        {
            product_status: DataTypes.STRING,
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
            modelName: "products_statuses",
        }
    );
    return products_statuses;
};
