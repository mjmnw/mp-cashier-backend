"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users_roles", [
            {
                user_role: "Admin",
            },
            {
                user_role: "Cashier",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {},
};
