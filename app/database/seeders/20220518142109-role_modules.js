'use strict';
const {module: modulo} = require('../../models/index');

module.exports = {
	async up(queryInterface, Sequelize) {
		const countModulos = await modulo.count();
		const data = [];
		for (let i = 1; i <= countModulos; i++)
			data.push({
				id_module: i,
				id_rol: 1,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		await queryInterface.bulkInsert('role_modules', data);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('role_modules', null, {});
	},
};
