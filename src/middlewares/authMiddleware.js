const res = require("express/lib/response");

const { verifyToken } = require("../lib/jwt");

const authorizeLoggedInUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = verifyToken(token);

        req.token = verifyToken;

        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(419).json({ message: "Token Expired" });
        }
        return res.status(401).json({ message: error.message });
    }
};

module.exports = authorizeLoggedInUser;
