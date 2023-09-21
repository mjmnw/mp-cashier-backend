const router = require("express").Router();
const authorizeLoggedInUser = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

// Cashier
router.post("/register", adminController.createUser);
router.delete(
    "/user=:userId",
    authorizeLoggedInUser,
    adminController.deleteUser
);
router.patch("/user/:userId", authorizeLoggedInUser, adminController.editUser);
router.get("/user/", authorizeLoggedInUser, adminController.getAllUsers);

// Product
router.post("/product", adminController.addProduct);
router.delete(
    "/product=:productId",
    authorizeLoggedInUser,
    adminController.deleteProduct
);
router.patch(
    "/product/:productId",
    authorizeLoggedInUser,
    adminController.editProduct
);

// Category
router.post("/category", adminController.addProductCategory);
router.delete(
    "/category=:productCategoryId",
    authorizeLoggedInUser,
    adminController.deleteProductCategory
);
router.patch(
    "/category/:productCategoryId",
    authorizeLoggedInUser,
    adminController.editProductCategory
);

module.exports = router;
