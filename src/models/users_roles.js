"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users_roles extends Model {
        static associate({ users }) {
            this.hasMany(users, { foreignKey: "users_roles_id" });
        }
    }
    users_roles.init(
        {
            user_role: DataTypes.STRING,
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
            modelName: "users_roles",
        }
    );
    return users_roles;
};
