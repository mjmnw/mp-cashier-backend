const ProductService = require("../services/productService");

const productControllers = {
    getProduct: async (req, res) => {
        try {
            const serviceResult = await ProductService.getProduct(req);

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

module.exports = productControllers;
