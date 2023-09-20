const router = require("express").Router();
const cartController = require("../controllers/cartController");
const authorizeLoggedInUser = require("../middlewares/authMiddleware");

router.post("/add-to-cart", authorizeLoggedInUser, cartController.addToCart);
router.get(
    "/get-cart/cart=:cartId",
    authorizeLoggedInUser,
    cartController.getCartByCartId
);
router.get(
    "/get-cart/user=:userId",
    authorizeLoggedInUser,
    cartController.getCartByUserId
);
router.patch(
    "/edit-cart/cart=:cartId",
    authorizeLoggedInUser,
    cartController.editCart
);
router.delete(
    "/delete-cart/cart=:userId",
    authorizeLoggedInUser,
    cartController.deleteCartByUserId
);

module.exports = router;
