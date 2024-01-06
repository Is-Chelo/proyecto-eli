const {modulos} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await modulos.create(body);

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await modulos.findAll({});
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
			const response = await modulos.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`modulos con el id: ${id} no existe. `);
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
			const response = await modulos.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`modulos con el id: ${id} no existe.`);

			await modulos.update(body, {
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
			const response = await modulos.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La modulos con el id: ${id} que solicitas no existe `);

			await modulos.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
