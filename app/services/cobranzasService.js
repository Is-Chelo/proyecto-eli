const {cobranza} = require('../models/index');
const Filter = require('../utils/filter');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await cobranza.create(body);
			
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			let response = await cobranza.findAll({});
			
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, cobranza);
			}

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
			const response = await cobranza.findOne({
				where: {
					id: id,
				},
			});
			if (!response) return NotFoundResponse(`cobranza con el id: ${id} no existe. `);
			return Successful('Operacion Exitosa', response.fromDataModel());
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await cobranza.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`cobranza con el id: ${id} no existe.`);
			

			await cobranza.update(body, {
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
			const response = await cobranza.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La cobranza con el id: ${id} que solicitas no existe `);

			await cobranza.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
