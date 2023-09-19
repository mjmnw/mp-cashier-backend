const Service = require("./service");
const db = require("../models/");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

class AdminService extends Service {
    // Cashier
    static createUser = async (
        username,
        password,
        fullname,
        email,
        birthdate,
        phone_number,
        address,
        users_statuses_id,
        users_roles_id
    ) => {
        try {
            const isUsernameOrEmailTaken = await db.users.findOne({
                where: { [Op.or]: [{ username }, { email }] },
            });

            if (isUsernameOrEmailTaken) {
                return this.handleError({
                    statusCode: 400,
                    message: "Username or Email has been taken.",
                });
            }
            const hashPassword = bcrypt.hashSync(password, 5);

            const registerCashier = await db.users.create({
                username,
                password: hashPassword,
                fullname,
                email,
                birthdate,
                phone_number,
                address,
                users_statuses_id,
                users_roles_id,
            });

            return this.handleSuccess({
                statusCode: 201,
                message: "Account Create Success",
                data: registerCashier,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static deleteUser = async (req) => {
        try {
            const { userId } = req.params;

            const findUser = await db.users.findOne({
                where: {
                    id: userId,
                },
            });

            if (!findUser)
                return this.handleError({
                    statusCode: 404,
                    message: `User with ID: ${userId} not Found!`,
                });

            const deletedUser = await db.users.destroy({
                where: {
                    id: userId,
                },
            });

            return this.handleSuccess({
                statusCode: 201,
                message: "User Delete Success",
                data: deletedUser,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

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

    static deleteProduct = async (req) => {
        try {
            const { productId } = req.params;
            const findProduct = await db.products.findOne({
                where: {
                    id: productId,
                },
            });

            if (!findProduct)
                return this.handleError({
                    statusCode: 404,
                    message: "Product Not Found",
                });

            const deletedProduct = await db.products.destroy({
                where: {
                    id: productId,
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
