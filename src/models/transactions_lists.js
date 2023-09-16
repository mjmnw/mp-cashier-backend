"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transactions_lists extends Model {
        static associate({ users, transactions_details }) {
            this.belongsTo(users, { foreignKey: "users_id" });
            this.hasMany(transactions_details, {
                foreignKey: "transactions_lists_id",
            });
        }
    }
    transactions_lists.init(
        {
            transaction_total_price: DataTypes.DECIMAL,
            transaction_status: DataTypes.STRING,
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
            modelName: "transactions_lists",
        }
    );
    return transactions_lists;
};
