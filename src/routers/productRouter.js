const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/:productId", productController.getProduct);

module.exports = router;
