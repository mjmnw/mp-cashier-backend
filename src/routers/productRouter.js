const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/product=:productId", productController.getProductById);
router.get("/", productController.filterProducts);
router.get("/category/", productController.getAllProductCategories);

module.exports = router;
