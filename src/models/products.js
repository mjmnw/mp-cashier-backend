"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        static associate({
            products_statuses,
            products_categories,
            users_carts,
            transactions_details,
        }) {
            this.belongsTo(products_statuses, {
                foreignKey: "products_statuses_id",
            });
            this.belongsTo(products_categories, {
                foreignKey: "products_categories_id",
            });
            this.hasMany(users_carts, { foreignKey: "products_id" });
            this.hasMany(transactions_details, { foreignKey: "products_id" });
        }
    }
    products.init(
        {
            product_name: DataTypes.STRING,
            product_description: DataTypes.STRING,
            product_price: DataTypes.DECIMAL,
            product_stock: DataTypes.INTEGER,
            product_image: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            deletedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            modelName: "products",
        }
    );
    return products;
};
