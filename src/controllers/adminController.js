const AdminService = require("../services/adminService");

const adminControllers = {
    // Cashier

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
            const { id } = req.params;
            const serviceResult = await AdminService.deleteProduct(id);

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
};

module.exports = adminControllers;
