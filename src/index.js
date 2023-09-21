const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
// const fs = require("fs");
// const moment = require("moment");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

dotenv.config();

const PORT = 5000;

app.get("/", (req, res) => {
    res.status(201).send("<h1>Welcome to JCWD-2502 API</h1>");
});

// Import Router
const { authRouter } = require("./routers");
const { userRouter } = require("./routers");
const { productRouter } = require("./routers");
const { adminRouter } = require("./routers");
const { cartRouter } = require("./routers");
const { transactionRouter } = require("./routers");
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/transaction", transactionRouter);

// Centralized Error
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const statusMessage = err.message || "Error";

    return res.status(statusCode).send({
        isError: true,
        message: statusMessage,
        data: null,
    });
});

app.listen(PORT, () => console.log(`API Running on Port ${PORT}`));
