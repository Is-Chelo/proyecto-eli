'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('role_modules', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_module: {
				type: Sequelize.INTEGER,
				references: {
					model: 'modules',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			id_rol: {
				type: Sequelize.INTEGER,
				references: {
					model: 'roles',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			ok_select: {
				type: Sequelize.BOOLEAN,
			},
			ok_update: {
				type: Sequelize.BOOLEAN,
			},
			ok_insert: {
				type: Sequelize.BOOLEAN,
			},
			ok_delete: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('role_modules');
	},
};
