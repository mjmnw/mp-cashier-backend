"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate({
            users_status,
            users_role,
            users_carts,
            transactions_lists,
        }) {
            this.belongsTo(users_status, { foreignKey: "users_status_id" });
            this.belongsTo(users_role, { foreignKey: "users_role_id" });
            this.hasMany(users_carts, { foreignKey: "users_id" });
            this.hasMany(transactions_lists, { foreignKey: "users_id" });
        }
    }
    users.init(
        {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            fullname: DataTypes.STRING,
            email: DataTypes.STRING,
            birthdate: DataTypes.DATE,
            phone_number: DataTypes.STRING,
            address: DataTypes.STRING,
            profile_picture: DataTypes.STRING,
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
            modelName: "users",
        }
    );
    return users;
};
