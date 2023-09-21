const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAILNODE, // Email Sender
        pass: process.env.PASSWORDNODE, // Key Generate
    },
    tls: {
        rejectUnauthorized: false,
    },
});
module.exports = transporter;
