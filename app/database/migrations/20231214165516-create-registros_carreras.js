'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('registros_carreras', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_personal: {
				type: Sequelize.INTEGER,
			},
			id_estudiante: {
				type: Sequelize.INTEGER,
			},
			id_curso: {
				type: Sequelize.INTEGER,
			},
			anio: {
				type: Sequelize.STRING,
			},
			estado: {
				type: Sequelize.BOOLEAN,
			},
			condicion: {
				type: Sequelize.STRING,
			},
			fecha_registro: {
				type: Sequelize.DATE,
			},
			fecha_programacion: {
				type: Sequelize.DATE,
			},
			comentario: {
				type: Sequelize.STRING,
			},
			modalidad: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('registros_carreras');
	},
};
