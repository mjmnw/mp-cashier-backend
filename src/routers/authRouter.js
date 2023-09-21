const router = require("express").Router();
const authController = require("../controllers/authController");
const authorizeLoggedInUser = require("../middlewares/authMiddleware");

router.post("/login", authController.loginUser);
router.get(
    "/refresh-token",
    authorizeLoggedInUser,
    authController.keepLoginUser
);
router.post(
    "/change-password",
    authorizeLoggedInUser,
    authController.changePassword
);

router.post(
    "/send-reset-password-email",
    authController.sendResetPasswordEmail
);

router.post("/reset-password", authController.resetPassword);
module.exports = router;
