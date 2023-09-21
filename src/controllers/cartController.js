const CartService = require("../services/cartService");

const cartControllers = {
    addToCart: async (req, res) => {
        try {
            const { users_id, products_id, cart_quantity } = req.body;

            const serviceResult = await CartService.addToCart(
                users_id,
                products_id,
                cart_quantity
            );

            if (!serviceResult.success) throw serviceResult;

            return res.status(serviceResult.statusCode).json({
                message: serviceResult.message,
                data: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    getAllCarts: async (req, res) => {
        try {
            const serviceResult = await CartService.getAllCarts();

            if (!serviceResult.success) throw serviceResult;

            return res.status(serviceResult.statusCode || 200).json({
                message: serviceResult.message,
                result: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    getCartByCartId: async (req, res) => {
        try {
            const { cartId } = req.params;

            const serviceResult = await CartService.getCartByCartId(cartId);

            if (!serviceResult.success) throw serviceResult;

            return res.status(serviceResult.statusCode).json({
                message: serviceResult.message,
                data: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    getCartByUserId: async (req, res) => {
        try {
            const { userId } = req.params;

            const serviceResult = await CartService.getCartByUserId(userId);

            if (!serviceResult) throw serviceResult;

            return res.status(serviceResult.statusCode).json({
                message: serviceResult.message,
                data: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    editCart: async (req, res) => {
        try {
            const { cart_total_price, cart_quantity } = req.body;

            const serviceResult = await CartService.editCart(req, req.body);

            if (!serviceResult) throw serviceResult;

            return res.status(serviceResult.statusCode).json({
                message: serviceResult.message,
                data: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    deleteCartByUserId: async (req, res) => {
        try {
            const serviceResult = await CartService.deleteCartByUserId(
                req.params.userId
            );

            if (!serviceResult) throw serviceResult;

            return res.status(serviceResult.statusCode).json({
                message: serviceResult.message,
                data: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },

    deleteCartByCartId: async (req, res) => {
        try {
            const serviceResult = await CartService.deleteCartByCartId(
                req.params.cartId
            );

            if (!serviceResult) throw serviceResult;

            return res.status(serviceResult.statusCode).json({
                message: serviceResult.message,
                data: serviceResult.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    },
};

module.exports = cartControllers;
