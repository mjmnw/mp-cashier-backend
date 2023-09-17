const AuthService = require("../services/authService");

const authControllers = {
    createCashier: async (req, res) => {
        try {
            const {
                username,
                password,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                users_statuses_id,
                users_roles_id,
            } = req.body;

            console.log(req.body);

            const serviceResult = await AuthService.createCashier(
                username,
                password,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                users_statuses_id,
                users_roles_id
            );
            if (!serviceResult.success) {
                throw serviceResult;
            }
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

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const serviceResult = await AuthService.loginUser(
                username,
                password
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

    keepLoginUser: async (req, res) => {
        try {
            const { tokens } = req;

            const serviceResult = await AuthService.keepLoginUser(tokens);

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

module.exports = authControllers;
