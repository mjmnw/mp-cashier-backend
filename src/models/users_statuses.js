"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users_statuses extends Model {
        static associate({ users }) {
            this.hasMany(users, { foreignKey: "users_statuses_id" });
        }
    }
    users_statuses.init(
        {
            user_status: DataTypes.STRING,
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
            modelName: "users_statuses",
        }
    );
    return users_statuses;
};
