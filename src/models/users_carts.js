"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users_carts extends Model {
        static associate({ users, products }) {
            this.belongsTo(users, { foreignKey: "users_id" });
            this.belongsTo(products, { foreignKey: "products_id" });
        }
    }
    users_carts.init(
        {
            cart_quantity: DataTypes.INTEGER,
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
            modelName: "users_carts",
        }
    );
    return users_carts;
};
