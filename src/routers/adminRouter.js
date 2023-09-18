const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/addproduct", adminController.addProduct);

module.exports = router;
