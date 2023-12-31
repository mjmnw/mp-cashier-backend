"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users_statuses", [
            {
                user_status: "Active",
            },
            {
                user_status: "Deactive",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {},
};
