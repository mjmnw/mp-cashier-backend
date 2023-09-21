const TransactionService = require("../services/transactionService");

const transactionControllers = {
    createTransaction: async (req, res) => {
        try {
            const { users_id, transaction_total_price, transaction_status } =
                req.body;
            const serviceResult = await TransactionService.createTransaction(
                users_id,
                transaction_total_price,
                transaction_status
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
