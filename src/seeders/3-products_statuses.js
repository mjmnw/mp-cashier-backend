"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("products_statuses", [
            {
                product_status: "Active",
            },
            {
                product_status: "Deactive",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {},
};
