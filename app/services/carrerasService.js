const {carreras} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await carreras.create(body);

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await carreras.findAll({});
			return Successful(
				'Operacion Exitosa',
				response.map((item) => item.fromDataModel())
			);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`carreras con el id: ${id} no existe. `);
			return Successful('Operacion Exitosa', response.fromDataModel());
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`carreras con el id: ${id} no existe.`);

			await carreras.update(body, {
				where: {
					id: id,
				},
			});

			return Successful('Registro actualizado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para eliminar un item
	async delete(id) {
		try {
			const response = await carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La carreras con el id: ${id} que solicitas no existe `);

			await carreras.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
