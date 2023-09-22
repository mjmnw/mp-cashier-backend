const router = require("express").Router();
const authorizeLoggedInUser = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const upload = require("./../middlewares/upload");


router.get("/:userId", userController.getUserById);
router.patch("/user=:userId", authorizeLoggedInUser, userController.editUser);
router.post("/add", upload, userController.createUser);
module.exports = router;