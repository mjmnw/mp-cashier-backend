const Service = require("./service");
const { sequelize } = require("../models");
const db = require("../models/");
const { Op } = require("sequelize");

class CartService extends Service {
    static addToCart = async (users_id, products_id, cart_quantity = 1) => {
        try {
            const findCart = await db.users_carts.findOne({
                where: {
                    users_id,
                    products_id,
                },
            });

            if (findCart) {
                await db.users_carts.update(
                    {
                        cart_quantity:
                            cart_quantity + findCart.cart_quantity,
                    },
                    {
                        where: {
                            users_id,
                            products_id,
                        },
                    }
                );
            } else {
                await db.users_carts.create({
                    users_id,
                    products_id,
                    cart_quantity,
                });
            }

            const findProduct = await db.products.findOne({
                where: {
                    id: products_id,
                },
            });

            const findUserCart = await db.users_carts.findOne({
                where: {
                    products_id,
                },
            });

            // if (!findProduct) {
            //     return this.handleError({
            //         message: "Product not Found",
            //         statusCode: 404,
            //     });
            // }

            if (
                findProduct.dataValues.product_stock <
                findUserCart.cart_quantity
            ) {
                return this.handleError({
                    message: "Stock not Available",
                    statusCode: 400,
                });
            }

            const userCart = await db.users_carts.findAll({
                where: {
                    users_id,
                },
                include: db.products,
            });

            return this.handleSuccess({
                message: "Product added to your cart",
                statusCode: 201,
                data: userCart,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                message: "Server Error",
                statusCode: 500,
            });
        }
    };

    static getAllCarts = async (req) => {
        try {
            const getCartsData = await db.users_carts.findAll();

            if (!getCartsData.length) {
                return this.handleError({
                    message: `No cart found`,
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: `Carts found`,
                statusCode: 200,
                data: getCartsData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static getCartByCartId = async (cartId) => {
        try {
            const findCart = await db.users_carts.findAll({
                where: {
                    id: cartId,
                },
                include: db.products,
            });

            if (!findCart.length) {
                return this.handleError({
                    message: "Cart not Found",
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: "Cart Found",
                statusCode: 200,
                data: findCart,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                message: "Server Error",
                statusCode: 500,
            });
        }
    };

    static getCartByUserId = async (userId) => {
        try {
            const userCart = await db.users_carts.findAll({
                where: {
                    users_id: userId,
                },
                include: db.products,
            });

            if (!userCart.length) {
                return this.handleError({
                    message: "User's Cart not Found",
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: "User's Cart Found!",
                statusCode: 200,
                data: userCart,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                message: "Server Error",
                statusCode: 500,
            });
        }
    };

    static editCart = async (req, body) => {
        try {
            const { cartId } = req.params;

            const findCart = await db.users_carts.findOne({
                where: {
                    id: cartId,
                },
            });

            if (!findCart) {
                return this.handleError({
                    statusCode: 404,
                    message: "Cart not Found",
                });
            }

            const editCartData = await db.users_carts.update(
                {
                    cart_total_price: body.cart_total_price,
                    cart_quantity: body.cart_quantity,
                },
                {
                    where: {
                        id: cartId,
                    },
                }
            );

            return this.handleSuccess({
                message: "Cart Edit Success",
                statusCode: 200,
                data: editCartData,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                message: "Server Error",
                statusCode: 500,
            });
        }
    };

    static deleteCartByUserId = async (userId) => {
        try {
            const findCart = await db.users_carts.findOne({
                where: {
                    users_id: userId,
                },
            });

            if (!findCart) {
                return this.handleError({
                    statusCode: 404,
                    message: "Cart not Found",
                });
            }
            const deleteCart = await db.users_carts.destroy({
                where: {
                    users_id: userId,
                },
            });
            return this.handleSuccess({
                message: "Cart Deleted",
                statusCode: 200,
                data: deleteCart,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                message: "Server Error",
                statusCode: 500,
            });
        }
    };

    static deleteCartByCartId = async (cartId) => {
        try {
            const findCart = await db.users_carts.findOne({
                where: {
                    id: cartId,
                },
            });

            if (!findCart) {
                return this.handleError({
                    statusCode: 404,
                    message: "Cart not Found",
                });
            }
            const deleteCart = await db.users_carts.destroy({
                where: {
                    id: cartId,
                },
            });
            return this.handleSuccess({
                message: "Cart Deleted",
                statusCode: 200,
                data: deleteCart,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                message: "Server Error",
                statusCode: 500,
            });
        }
    };
}

module.exports = CartService;
