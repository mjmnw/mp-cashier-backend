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

    static editUser = async (req, body) => {
        try {
            const { userId } = req.params;

            const findUser = await db.users.findOne({
                where: {
                    id: userId,
                },
            });

            if (!findUser) {
                return this.handleError({
                    statusCode: 404,
                    message: `User with ID: ${userId} not Found!`,
                });
            }

            const editUserData = await db.users.update(
                {
                    email: body.email,
                    phone_number: body.phone_number,
                    address: body.address,
                },
                {
                    where: {
                        id: userId,
                    },
                }
            );

            return this.handleSuccess({
                message: "User Edit Success",
                statusCode: 200,
                data: editUserData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static editUserProfilePicture = async (users_id, file) => {
        try {
            const findUser = await db.users.findOne({
                where: {
                    id: users_id,
                },
            });

            if (!findUser) {
                return this.handleError({
                    message: "No user found!",
                    statusCode: 404,
                });
            }

            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;

            const filePath = "profilePictures";

            const { filename } = file;

            const newProfilePicture = `${uploadFileDomain}/${filePath}/${filename}`;

            await db.users.update(
                {
                    profile_picture: newProfilePicture,
                },
                {
                    where: {
                        id: users_id,
                    },
                }
            );

            const findUpdatedUser = await db.users.findByPk(users_id);

            return this.handleSuccess({
                message: "Profile Picture Updated",
                statusCode: 200,
                data: findUpdatedUser,
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
