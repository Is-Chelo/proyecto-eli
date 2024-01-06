'use strict';
const bcrypt = require('bcrypt');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [
			{
				name: 'Admin',
				last_name: 'Admin last name',
				email: 'admin@gmail.com',
				date_birth: new Date(),
				address: 'Av. Siempre Viva',
				cellphone: '76565432',
				username: 'Admin',
				password: await bcrypt.hash('12345678', 10),
				id_rol: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				active: true,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	},
};
