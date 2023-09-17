const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");

class UserService extends Service {
    static getUserById = async (userId) => {
        try {
            const findUser = await db.users.findOne({
                where: {
                    id: userId,
                },
            });

            if (!findUser) {
                return this.handleError({
                    message: "Wrong User ID!",
                    statusCode: 400,
                });
            }

            delete findUser.dataValues.password;

            return this.handleSuccess({
                message: `You Found User ID = ${userId}`,
                data: findUser,
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

module.exports = UserService;
