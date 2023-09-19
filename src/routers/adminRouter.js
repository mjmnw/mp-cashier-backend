const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/register", adminController.createUser);
router.delete("/user=:userId", adminController.deleteUser);

router.post("/product", adminController.addProduct);
router.delete("/product=:productId", adminController.deleteProduct);
router.post("/category", adminController.addProductCategory);

module.exports = router;
