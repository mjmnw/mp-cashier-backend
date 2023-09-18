const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");

class AdminService extends Service {
    // Cashier

    // Products

    static addProduct = async (
        product_name,
        product_description,
        product_price,
        product_stock,
        product_image,
        products_statuses_id,
        products_categories_id
    ) => {
        try {
            const { productName } = req.params;

            const productNameTaken = await db.products.findOne({
                where: {
                    product_name: productName,
                },
            });

            if (productNameTaken) {
                return this.handleError({
                    statusCode: 400,
                    message: `Product name has been taken`,
                });
            }

            const registerProduct = await db.products.create({
                product_name,
                product_description,
                product_price,
                product_stock,
                product_image,
                products_statuses_id,
                products_categories_id,
            });
            return this.handleSuccess({
                statusCode: 201,
                message: "Product Create Success",
                data: registerProduct,
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

module.exports = AdminService;
