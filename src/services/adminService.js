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
            const productNameTaken = await db.products.findOne({
                where: {
                    product_name,
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

    static deleteProduct = async (id) => {
        try {
            const findProduct = await db.products.findOne({
                where: {
                    id,
                },
            });

            if (!findProduct)
                return this.handleError({
                    statusCode: 404,
                    message: "Product Not Found",
                });

            const deletedProduct = await db.products.destroy({
                where: {
                    id,
                },
            });

            return this.handleSuccess({
                statusCode: 201,
                message: "Product Delete Success",
                data: deletedProduct,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static addProductCategory = async (product_category) => {
        try {
            const findProductCategory = await db.products_categories.findOne({
                where: {
                    product_category,
                },
            });

            if (findProductCategory) {
                return this.handleError({
                    statusCode: 400,
                    message: "Product category has been taken",
                });
            }

            const registerProductCategory = await db.products_categories.create(
                {
                    product_category,
                }
            );

            return this.handleSuccess({
                statusCode: 201,
                message: "Category Create Success",
                data: registerProductCategory,
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
