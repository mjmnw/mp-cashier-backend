const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/:productId", productController.getProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
