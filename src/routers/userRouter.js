const router = require("express").Router();

const userController = require("../controllers/userController");

router.get("/:userId", userController.getUserById);

module.exports = router;