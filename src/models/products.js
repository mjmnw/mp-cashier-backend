"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        static associate({
            products_status,
            products_category,
            users_carts,
            transactions_details,
        }) {
            this.belongsTo(products_status, {
                foreignKey: "products_status_id",
            });
            this.belongsTo(products_category, {
                foreignKey: "products_category_id",
            });
            this.hasMany(users_carts, { foreignKey: "products_id" });
            this.hasMany(transactions_details, { foreignKey: "products_id" });
        }
    }
    products.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.DECIMAL,
            stock: DataTypes.INTEGER,
            image: DataTypes.STRING,
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
