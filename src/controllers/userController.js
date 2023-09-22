const UserService = require("../services/userService");

const userControllers = {
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const serviceResult = await UserService.getUserById(userId);

            if (!serviceResult.success) throw serviceResult;

            return res.status(serviceResult.statusCode || 200).json({
                message: serviceResult.message,
                result: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    editUser: async (req, res) => {
        try {
            const { email, phone_number, address } = req.body;

            const serviceResult = await UserService.editUser(req, req.body);

            if (!serviceResult.success) throw serviceResult;

            return res.status(serviceResult.statusCode || 200).json({
                message: serviceResult.message,
                result: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    editUserProfilePicture: async (req, res) => {
        try {
            const { users_id } = req.params;

            const serviceResult = await UserService.editUserProfilePicture(
                users_id,
                req.file
            );

            if (!serviceResult.success) throw serviceResult;

            return res.status(serviceResult.statusCode || 200).json({
                message: serviceResult.message,
                result: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },
};

module.exports = userControllers;
