const jwt = require("jsonwebtoken");

const KEY = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
    const tokens = jwt.sign(payload, KEY, { expiresIn: "1h" });
    return tokens;
};

const verifyToken = (tokens) => {
    const isVerified = jwt.verify(tokens, KEY);
    return isVerified;
};

module.exports = { generateToken, verifyToken };