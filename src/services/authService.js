const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");

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

    static loginUser = async (username, password) => {
        try {
            const findUser = await db.users.findOne({
                where: {
                    [Op.or]: [{ username }, { email: username }],
                },
            });

            const comparePassword = bcrypt.compareSync(
                password,
                findUser.password
            );

            if (!findUser || !comparePassword) {
                return this.handleError({
                    message: "Wrong username, email or password!",
                    statusCode: 400,
                });
            }

            delete findUser.dataValues.password;

            const tokens = generateToken({
                id: findUser.id,
            });

            return this.handleSuccess({
                statusCode: 200,
                message: "Login Success",
                data: {
                    user: findUser,
                    tokens,
                },
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static keepLoginUser = async (tokens) => {
        try {
            const renewedToken = generateToken({
                id: tokens.id,
            });

            const findUser = await db.users.findByPk(tokens.id);

            delete findUser.dataValues.password;

            return this.handleSuccess({
                statusCode: 200,
                message: "User's Token Renewed",
                data: {
                    tokens: renewedToken,
                },
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
