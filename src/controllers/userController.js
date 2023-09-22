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

    // editUserProfilePicture: async (req, res) => {
    //     try {
    //         const { userId } = req.params

    //         const { profile_picture } = req.body;

    //         const serviceResult = await UserService.editUserProfilePicture(userId , profile_picture)

    //         if (!serviceResult.success) throw serviceResult;

    //         return res.status(serviceResult.statusCode || 200).json({
    //             message: serviceResult.message,
    //             result: serviceResult.data,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(error.statusCode || 500).json({
    //             message: error.message,
    //         });
    //     }
    // },

    createUser: async (req, res, next) => {
        try {
          const data = JSON.parse(req.body.data);
          const dataImage = req.files.images[0].path;
          const addUser = await UserService.createUserProfilePicture (data, dataImage);
          res.status(201).send({
            isError: false,
            message: "Product Added",
            data: addUser,
          });
        } catch (error) {
          next(error);
        }
      },
};

module.exports = userControllers;
