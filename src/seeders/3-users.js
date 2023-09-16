"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.addColumn("users", "users_roles_id", {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // });
        // await queryInterface.addColumn("users", "users_statuses_id", {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
