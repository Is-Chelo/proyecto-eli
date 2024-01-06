'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estudiantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apellido: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      ci: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      inscrito: {
        type: Sequelize.BOOLEAN
      },
      image_path: {
        type: Sequelize.STRING
      },
      fecha_nac: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estudiantes');
  }
};