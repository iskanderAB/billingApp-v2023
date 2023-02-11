"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Documents",
      [
        {
          reference: "p-10000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reference: "p-20000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reference: "p-30000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reference: "p-40000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reference: "p-50000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Documents", null, {});
  },
};
