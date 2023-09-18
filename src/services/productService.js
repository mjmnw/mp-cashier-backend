const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");

class ProductService extends Service {
    static getProduct = async (req) => {
        try {
            const { productId } = req.params;

            const getProductData = await db.products.findOne({
                where: {
                    id: productId,
                },
            });

            if (!getProductData) {
                return this.handleError({
                    message: `Product with ID: ${productId} not Found!`,
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: `Product with ID: ${productId} Found!`,
                statusCode: 200,
                data: getProductData,
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

module.exports = ProductService;
