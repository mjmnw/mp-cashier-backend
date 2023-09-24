const Service = require("./service");
const { sequelize } = require("../models");
const db = require("../models/");
const { Op } = require("sequelize");

class TransactionService extends Service {
    static createTransaction = async (
        users_id,
        transaction_total_price,
        transaction_status,
        cart_quantity,
        products_id
    ) => {

        try {
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

            if (!findProduct) {
                return this.handleError({
                    message: "Product not Found",
                    statusCode: 404,
                });
            }

            if (
                findProduct.dataValues.product_stock <=
                findUserCart.cart_quantity
            ) {
                return this.handleError({
                    message: "Stock not Available",
                    statusCode: 400,
                });
            }

            const newTransaction = await db.transactions_lists.create({
                users_id,
                transaction_total_price,
                transaction_status,
            });

            await db.transactions_details.create({
                transaction_quantity: cart_quantity,
                products_id,
                transactions_lists_id: newTransaction.id
            })

            const findCart = await db.users_carts.findAll({
                where: {
                    users_id,
                },
            });

            // if (findCart) {
            //     await db.users_carts.destroy({
            //         where: {
            //             users_id,
            //         },
            //     });
            // } else {
            //     return this.handleError({
            //         message: "Cart not Found",
            //         statusCode: 404,
            //     });
            // }

            return this.handleSuccess({
                message: "Transaction Created",
                statusCode: 200,
                data: newTransaction,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    getAllTransactions = async (query) => {
        try {
            const {
                _limit = 10,
                _page = 1,
                _sortBy = "createdAt",
                _sortDir = "DESC",
                selectedProducts,
                transaction_quantity,
                username,
                users_id,
            } = query;

            delete query._limit;
            delete query._page;
            delete query._sortBy;
            delete query._sortDir;
            delete query.selectedProducts;
            delete query.transaction_quantity;
            delete query.username;
            delete query.users_id;

            const productClause = {};
            let userClause = {};

            if (selectedProducts) {
                productClause.products_id;
            }

            if (username) {
                userClause = {
                    username: {
                        [Op.like]: `%${username}%`,
                    },
                };
            }

            const findUser = await db.users.findOne({
                where: {
                    ...userClause,
                },
            });

            if (!findUser) {
                return this.handleError({
                    message: "No user found",
                    statusCode: 404,
                });
            }

            query.users_id = findUser.id;

            if (users_id) {
                query.users_id = users_id;
            }

            const findTransactions =
                await db.transactions_lists.findAndCountAll({
                    where: {
                        ...query,
                        ...productClause,
                    },
                    include: [
                        { model: db.users },
                        {
                            model: db.transactions_details,
                            include: db.products,
                        },
                    ],
                    limit: _limit ? parseInt(_limit) : undefined,
                    offset: (_page - 1) * _limit,
                    distinct: true,
                    order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
                });

            if (!findTransactions) {
                return this.handleError({
                    message: "No Transaction Found, Server Error",
                    statusCode: 500,
                });
            }

            return this.handleSuccess({
                message: "Transactions Data Found!",
                statusCode: 200,
            });
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };

    static getTransactionsDetailByListId = async (transactionId) => {
        try {
            const transactionDetail = await db.transactions_details.findAll({
                where: {
                    transactions_lists_id: transactionId,
                },
                include: db.products,
                
            });

            if (!transactionDetail.length) {
                return this.handleError({
                    message: "Transaction details not Found",
                    statusCode: 404,
                });
            }

            return this.handleSuccess({
                message: "Transaction details Found",
                statusCode: 200,
                data: transactionDetail,
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

module.exports = TransactionService;
