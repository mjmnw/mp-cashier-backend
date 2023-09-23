const router = require("express").Router();
const authorizeLoggedInUser = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");
const fileUploader = require("../lib/uploader");

// Cashier
router.post("/register", adminController.createUser);
router.delete(
    "/user=:userId",
    authorizeLoggedInUser,
    adminController.deleteUser
);
router.patch("/user/:userId", authorizeLoggedInUser, adminController.editUser);
router.get("/user/", authorizeLoggedInUser, adminController.getAllUsers);
router.patch(
    "/change-avatar/:users_id",
    fileUploader({
        destinationFolder: "profilePictures",
        fileType: "image",
        prefix: "AVATAR",
    }).single("avatar_image_file"),
    authorizeLoggedInUser,
    adminController.editUserProfilePicture
);

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
router.patch(
    "/change-product-image/:products_id",
    fileUploader({
        destinationFolder: "products",
        fileType: "image",
        prefix: "PRODUCTS",
    }).single("product_image_file"),
    authorizeLoggedInUser,
    adminController.editProductImage
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
