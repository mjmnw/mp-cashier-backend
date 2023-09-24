const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");
const transporter = require("../helper/transporter");
const mustache = require("mustache");
const fs = require("fs");
const moment = require("moment");
const { nanoid } = require("nanoid");

const FE_Domain = process.env.DOMAIN_FE;
const BE_Domain = process.env.DOMAIN_BE;

class AuthService extends Service {
    static loginUser = async (username, password) => {
        try {
            const findUser = await db.users.findOne({
                where: {
                    [Op.or]: [{ username }, { email: username }],
                },
            });

            if (!findUser) {
                return this.handleError({
                    message: "No User Found",
                    statusCode: 400,
                    isError: true
                });
            }

            const comparePassword = bcrypt.compareSync(
                password,
                findUser.password
            );

            if (!comparePassword) {
                return this.handleError({
                    message: "Wrong password!",
                    statusCode: 400,
                    isError: true
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
                    user: findUser,
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

    static sendResetPasswordEmail = async (userEmail) => {
        try {
            const findUser = await db.users.findOne({
                where: {
                    email: userEmail,
                },
            });

            if (!findUser) {
                return this.handleError({
                    message: "User not Found",
                    statusCode: 404,
                });
            }

            const resetPasswordToken = nanoid(40);

            await db.reset_password_tokens.create({
                tokens: resetPasswordToken,
                is_valid: true,
                valid_until: moment().add(1, "hour"),
                users_id: findUser.id,
            });

            const forgotPasswordLink = `${FE_Domain}/forgot-password?fp_token=${resetPasswordToken}`;

            const emailTemplate = fs
                .readFileSync(__dirname + "/../templates/resetPassword.html")
                .toString();

            const renderedTemplate = mustache.render(emailTemplate, {
                name: findUser.username,
                reset_password_url: forgotPasswordLink,
            });

            await transporter.sendMail({
                from: "Toko Jamu",
                to: userEmail,
                subject: "Reset your password!",
                html: renderedTemplate,
            });

            return this.handleSuccess({
                message: "Reset Password Email Sent!",
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

    static resetPassword = async (resetPasswordToken, password) => {
        try {
            const validateToken = await db.reset_password_tokens.findOne({
                where: {
                    tokens: resetPasswordToken,
                    is_valid: true,
                    valid_until: {
                        [Op.gt]: moment().utc(),
                    },
                },
            });

            if (!validateToken) {
                return this.handleError({
                    message: "Reset Password Token is invalid",
                    statusCode: 400,
                });
            }

            const newHashedPassword = bcrypt.hashSync(password, 5);

            await db.users.update(
                {
                    password: newHashedPassword,
                },
                {
                    where: {
                        id: validateToken.users_id,
                    },
                }
            );

            return this.handleSuccess({
                message: "Password has been changed!",
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
