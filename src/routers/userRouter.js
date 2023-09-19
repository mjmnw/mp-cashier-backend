const router = require("express").Router();
const authorizeLoggedInUser = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/:userId", userController.getUserById);
router.patch("/user=:userId", authorizeLoggedInUser, userController.editUser);

module.exports = router;