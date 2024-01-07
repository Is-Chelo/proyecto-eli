'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('personals', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_rol: {
				type: Sequelize.INTEGER,
			},
			apellido_paterno: {
				type: Sequelize.STRING,
			},
			apellido_materno: {
				type: Sequelize.STRING,
			},
			nombres: {
				type: Sequelize.STRING,
			},
			telefono: {
				type: Sequelize.STRING,
			},
			correo_electronico: {
				type: Sequelize.STRING,
			},
			numero_de_cuenta: {
				type: Sequelize.STRING,
			},
			tipo_de_cuenta: {
				type: Sequelize.STRING,
			},
			banco: {
				type: Sequelize.STRING,
			},
			ci: {
				type: Sequelize.STRING,
			},
			carrera_o_curso: {
				type: Sequelize.STRING,
			},
			pago_por_hora: {
				type: Sequelize.FLOAT,
			},
			fecha_de_nacimiento: {
				type: Sequelize.DATE,
			},
			profesion: {
				type: Sequelize.STRING,
			},
			universidad: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('personals');
	},
};
