'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombre_corto: {
        type: Sequelize.STRING
      },
      anio_turno: {
        type: Sequelize.STRING
      },
      modalidad: {
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      hora_inicio: {
        type: Sequelize.STRING
      },
      cantidad_horas: {
        type: Sequelize.STRING
      },
      dias: {
        type: Sequelize.STRING
      },
      id_aula: {
        type: Sequelize.INTEGER
      },
      id_personal: {
        type: Sequelize.INTEGER
      },
      id_tipo_curso: {
        type: Sequelize.INTEGER
      },
      id_modulos: {
        type: Sequelize.INTEGER
      },
      id_plan_estudio: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('cursos');
  }
};