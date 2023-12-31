const AdminService = require("../services/adminService");

const adminControllers = {
    // User
    createUser: async (req, res) => {
        try {
            const {
                username,
                password,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                gender,
                salary,
                users_statuses_id,
                users_roles_id,
            } = req.body;

            const serviceResult = await AdminService.createUser(
                username,
                password,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                gender,
                salary,
                users_statuses_id,
                users_roles_id
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

    deleteUser: async (req, res) => {
        try {
            const serviceResult = await AdminService.deleteUser(
                req.params.userId
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

    editUser: async (req, res) => {
        try {
            const {
                username,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                gender,
                salary,
                users_statuses_id,
                users_roles_id,
            } = req.body;

            const serviceResult = await AdminService.editUser(req, req.body);

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

    getAllUsers: async (req, res) => {
        try {
            const serviceResult = await AdminService.getAllUsers();

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

            const serviceResult = await AdminService.editUserProfilePicture(
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

    // Product
    addProduct: async (req, res) => {
        try {
            const {
                product_name,
                product_description,
                product_price,
                product_stock,
                product_image,
                products_statuses_id,
                products_categories_id,
            } = req.body;

            const serviceResult = await AdminService.addProduct(
                product_name,
                product_description,
                product_price,
                product_stock,
                product_image,
                products_statuses_id,
                products_categories_id
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

    deleteProduct: async (req, res) => {
        try {
            const serviceResult = await AdminService.deleteProduct(
                req.params.productId
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

    editProduct: async (req, res) => {
        try {
            const {
                product_name,
                product_description,
                product_price,
                products_statuses_id,
                products_categories_id,
            } = req.body;

            const serviceResult = await AdminService.editProduct(req, req.body);

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

    editProductImage: async (req, res) => {
        try {
            const { products_id } = req.params;

            const serviceResult = await AdminService.editProductImage(
                products_id,
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

    // Category
    addProductCategory: async (req, res) => {
        try {
            const { product_category } = req.body;
            const serviceResult = await AdminService.addProductCategory(
                product_category
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

    deleteProductCategory: async (req, res) => {
        try {
            const serviceResult = await AdminService.deleteProductCategory(
                req.params.productCategoryId
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

    editProductCategory: async (req, res) => {
        try {
            const { product_category } = req.body;

            const serviceResult = await AdminService.editProductCategory(req, req.body);

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

module.exports = adminControllers;
