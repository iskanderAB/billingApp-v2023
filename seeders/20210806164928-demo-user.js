'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'iskander',
      username: 'AB',
      email: 'iskander@example.com',
      password : 'xxxx', 
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: 'Ali',
      username: 'AB',
      email: 'Ali@example.com',
      password : 'yyyy', 
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: 'dali',
      username: 'kbaier',
      email: 'dali@example.com',
      password : 'ttttt', 
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: 'monta',
      username: 'chouikh',
      email: 'chouikh@example.com',
      password : 'ccccc', 
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: 'mohammed',
      username: 'akkarri',
      email: 'akkari@example.com',
      password : 'aaaaa', 
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
