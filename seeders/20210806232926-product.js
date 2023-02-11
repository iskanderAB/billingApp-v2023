"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          designation: "ziiit",
          image: "url",
          type: "P",
          manifacturer_refernce: "w125478",
          internal_refernce: "xefref",
          description: "hello ziiit ",
          price: 20,
          tva: 19,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          designation: "ziiit",
          image: "url",
          type: "P",
          manifacturer_refernce: "w125478",
          internal_refernce: "xefref",
          description: "hello ziiit ",
          price: 20,
          tva: 19,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          designation: "gaze",
          image: "url",
          type: "S",
          manifacturer_refernce: "w125478",
          internal_refernce: "xefref",
          description: "hello ziiit ",
          price: 20,
          tva: 19,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          designation: "battrie",
          image: "url",
          type: "P",
          manifacturer_refernce: "w125478",
          internal_refernce: "xefref",
          description: "hello ziiit ",
          price: 20,
          tva: 19,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          designation: "ziiit",
          image: "url",
          type: "P",
          manifacturer_refernce: "w125478",
          internal_refernce: "xefref",
          description: "hello ziiit ",
          price: 20,
          tva: 19,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
