const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");
// const db.users = require("../models/db.users");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

class AuthService extends Service {
    static createCashier = async (
        username,
        password,
        fullname,
        email,
        birthdate,
        phone_number,
        address,
        users_statuses_id,
        users_roles_id
    ) => {
        try {
            const isUsernameOrEmailTaken = await db.users.findOne({
                where: { [Op.or]: [{ username }, { email }] },
            });

            if (isUsernameOrEmailTaken) {
                return this.handleError({
                    statusCode: 400,
                    message: "Username or Email has been taken.",
                });
            }
            const hashPassword = bcrypt.hashSync(password, 5);

            const registerCashier = await db.users.create({
                username,
                password: hashPassword,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                users_statuses_id,
                users_roles_id,
            });

            return this.handleSuccess({
                statusCode: 201,
                message: "Account Create Success",
                data: registerCashier,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };
}

module.exports = AuthService;
