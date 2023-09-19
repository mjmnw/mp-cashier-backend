const router = require("express").Router();
const adminController = require("../controllers/adminController");
const authorizeLoggedInUser = require("../middlewares/authMiddleware");

router.post("/register", adminController.createUser);
router.delete("/user/:userId", adminController.deleteUser);

router.patch("/user/:userId", authorizeLoggedInUser, adminController.editUser);

router.post("/product", adminController.addProduct);
router.delete(
    "/product/:productId",
    authorizeLoggedInUser,
    adminController.deleteProduct
);
router.post("/category", adminController.addProductCategory);

module.exports = router;
