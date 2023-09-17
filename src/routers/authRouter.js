const router = require("express").Router();
const authController = require("../controllers/authController");
const authorizeLoggedInUser = require("../middlewares/authMiddleware");

router.post("/register", authController.createCashier);
router.post("/login", authController.loginUser);
router.get("/refresh-token", authorizeLoggedInUser, authController.keepLoginUser);

module.exports = router;
