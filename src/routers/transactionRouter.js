const router = require("express").Router();
const transactionControllers = require("../controllers/transactionController");
const authorizeLoggedInUser = require("../middlewares/authMiddleware");

router.post(
    "/add-new-transaction",
    authorizeLoggedInUser,
    transactionControllers.createTransaction
);

router.get(
    "/",
    authorizeLoggedInUser,
    transactionControllers.getAllTransactions
);

module.exports = router;
