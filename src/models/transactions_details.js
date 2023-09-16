"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transactions_details extends Model {
        static associate({ transactions_lists, products }) {
            this.belongsTo(transactions_lists, {
                foreignKey: "transactions_lists_id",
            });
            this.belongsTo(products, { foreignKey: "products_id" });
        }
    }
    transactions_details.init(
        {
            transaction_quantity: DataTypes.INTEGER,
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
            modelName: "transactions_details",
        }
    );
    return transactions_details;
};
