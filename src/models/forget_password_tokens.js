"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class forget_password_tokens extends Model {
        static associate({ users }) {
            this.belongsTo(users, { foreignKey: "users_id" });
        }
    }
    forget_password_tokens.init(
        {
            tokens: DataTypes.STRING,
            is_valid: DataTypes.BOOLEAN,
            valid_until: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "forget_password_tokens",
        }
    );
    return forget_password_tokens;
};
