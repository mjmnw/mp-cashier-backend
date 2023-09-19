const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");

class AuthService extends Service {
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

    static changePassword = async (userId, oldPassword, newPassword) => {
        try {
            const findUser = await db.users.findByPk(userId);

            if (!findUser)
                return this.handleError({
                    message: `User with ID: ${userId} not Found!`,
                    statusCode: 400,
                });

            const comparePassword = bcrypt.compareSync(
                oldPassword,
                findUser.password
            );

            if (!comparePassword)
                return this.handleError({
                    message: `Your current password is wrong!`,
                    statusCode: 400,
                });

            const newHashedPassword = bcrypt.hashSync(newPassword, 5);

            await db.users.update(
                {
                    password: newHashedPassword,
                },
                {
                    where: {
                        id: userId,
                    },
                }
            );
            return this.handleSuccess({
                message: "Your password has been changed!",
                statusCode: 200,
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
