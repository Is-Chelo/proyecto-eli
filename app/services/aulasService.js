const {aulas} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await aulas.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await aulas.findAll({});
			return Successful(
				'Operacion Exitosa',
				response.map((item) => item.fromDataModel())
			);
			// return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await aulas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`aulas con el id: ${id} no existe. `);
			}
			return Successful('Operacion Exitosa', response.fromDataModel());

			// return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await aulas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`aulas con el id: ${id} no existe.`);

			await aulas.update(body, {
				where: {
					id: id,
				},
			});

			return Successful('Registro actualizado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para eliminar un item
	async delete(id) {
		try {
			const response = await aulas.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La aulas con el id: ${id} que solicitas no existe `);

			await aulas.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
