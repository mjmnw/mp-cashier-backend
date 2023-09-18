const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/:productId", productController.getProduct);
router.post("/addproduct", productController.addProduct);
module.exports = router;
