const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/addproduct", adminController.addProduct);
router.delete("/:id", adminController.deleteProduct);
router.post("/addcategory", adminController.addProductCategory);

module.exports = router;
