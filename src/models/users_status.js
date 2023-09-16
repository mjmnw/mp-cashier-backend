"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users_status extends Model {
        static associate({ users }) {
            this.hasMany(users, { foreignKey: "users_status_id" });
        }
    }
    users_status.init(
        {
            status: DataTypes.STRING,
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
            modelName: "users_status",
        }
    );
    return users_status;
};
