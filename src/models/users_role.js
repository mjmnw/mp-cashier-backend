"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users_role extends Model {
        static associate({ users }) {
            this.hasMany(users, { foreignKey: "users_role_id" });
        }
    }
    users_role.init(
        {
            role: DataTypes.STRING,
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
            modelName: "users_role",
        }
    );
    return users_role;
};
