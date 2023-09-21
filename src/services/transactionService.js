const Service = require("./service");
const { sequelize } = require("../models");
const db = require("../models/");
const { Op } = require("sequelize");
// const { nanoid } = require("nanoid");

class TransactionService extends Service {
    static createTransaction = async (req, res) => {
        try {

            
        } catch (error) {
            console.log(error);
            return this.handleError({
                statusCode: 500,
                message: "Server Error",
            });
        }
    };
}

module.exports = TransactionService;
