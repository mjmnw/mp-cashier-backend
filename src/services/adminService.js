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

    static deleteUser = async (userId) => {
        try {
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

    static editUser = async (req, body) => {
        try {
            const { userId } = req.params;

            const findUser = await db.users.findOne({
                where: {
                    id: userId,
                },
            });

            if (!findUser) {
                return this.handleError({
                    statusCode: 404,
                    message: `User with ID: ${userId} not Found!`,
                });
            }

            const editUserData = await db.users.update(
                {
                    username: body.username,
                    fullname: body.fullname,
                    email: body.email,
                    birthdate: body.birthdate,
                    phone_number: body.phone_number,
                    address: body.address,
                    users_statuses_id: body.users_statuses_id,
                    users_roles_id: body.users_roles_id,
                },
                {
                    where: {
                        id: userId,
                    },
                }
            );

            return this.handleSuccess({
                message: "User Edit Success",
                statusCode: 200,
                data: editUserData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static getAllUsers = async (req) => {
        try {
            const getUsersData = await db.users.findAll()

            if (!getUsersData.length) {
                return this.handleError({
                    message: `No user found`,
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: `Users found`,
                statusCode: 200,
                data: getUsersData,
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

    static deleteProduct = async (productId) => {
        try {
            const findProduct = await db.products.findOne({
                where: {
                    id: productId,
                },
            });

            if (!findProduct)
                return this.handleError({
                    statusCode: 404,
                    message: `Product with Product ID: ${productId} Not Found!`,
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

    static getAllUsers = async (req) => {
        try {
            const getUsersData = await db.users.findAll()

            if (!getUsersData.length) {
                return this.handleError({
                    message: `No user found`,
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: `Users found`,
                statusCode: 200,
                data: getUsersData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    // Product Category
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

    static deleteProductCategory = async (productCategoryId) => {
        try {
            const findProductCategory = await db.products_categories.findOne({
                where: {
                    id: productCategoryId,
                },
            });

            if (!findProductCategory)
                return this.handleError({
                    statusCode: 404,
                    message: `Product Category with ID: ${productCategoryId} Not Found!`,
                });

            const deletedProductCategory = await db.products_categories.destroy(
                {
                    where: {
                        id: productCategoryId,
                    },
                }
            );

            return this.handleSuccess({
                statusCode: 201,
                message: "Product Delete Success",
                data: deletedProductCategory,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static editProductCategory = async (req, body) => {
        try {
            const { productCategoryId } = req.params;

            const findProductCategory = await db.products_categories.findOne({
                where: {
                    id: productCategoryId,
                },
            });

            if (!findProductCategory) {
                return this.handleError({
                    statusCode: 404,
                    message: `Product with ID: ${productCategoryId} not Found!`,
                });
            }

            const editProductCategoryData = await db.products_categories.update(
                {
                    product_category: body.product_category,
                },
                {
                    where: {
                        id: productCategoryId,
                    },
                }
            );

            return this.handleSuccess({
                message: "Product Category Edit Success",
                statusCode: 200,
                data: editProductCategoryData,
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
