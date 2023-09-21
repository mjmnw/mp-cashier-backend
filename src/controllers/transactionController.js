const TransactionService = require("../services/transactionService");

const transactionControllers = {
    createTransaction: async (req, res) => {
        try {
            const {
                users_id,
                transaction_total_price,
                transaction_status,
                cart_quantity,
            } = req.body;

            const serviceResult = await TransactionService.createTransaction(
                users_id,
                transaction_total_price,
                transaction_status,
                cart_quantity
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

    createDetailTransaction: async (req, res) => {
        try {
            const { transaction_quantity, products_id, transactions_lists_id } =
                req.body;

            const serviceResult =
                await TransactionService.createDetailTransaction(
                    transaction_quantity,
                    products_id,
                    transactions_lists_id
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

    getAllTransactions: async (req, res) => {
        try {
            const serviceResult = await TransactionService.getAllTransactions(
                req.query
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

module.exports = transactionControllers;
