const {programacion_modulos, cursos,personal, aulas, modulos} = require('../models/index');
const {InternalServer, NotFoundResponse, Successful} = require('../utils/response');
const Filter = require('../utils/filter');

module.exports = {
	async create(body) {
		try {
			const response = await programacion_modulos.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			// Define static include array
			const include = [
				{
					model: cursos,
					as: 'cursos',
					include: [
						{
							model: aulas,
						},
						{
							model:personal
						},
						
					]
				},
				{
					model: personal,
					as: 'personal'
				},
				{
							model:modulos
						}
			];
	
			let response;
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, programacion_modulos, include);
			} else {
				response = await programacion_modulos.findAll({
					include: include
				});
			}
	
			return Successful('Operación Exitosa', response.map(item => item.fromDataModel()));
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	}
	
	,

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await programacion_modulos.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`programacion_modulos con el id: ${id} no existe. `);
			}
			return Successful('Operacion Exitosa', response.fromDataModel());
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await programacion_modulos.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`programacion_modulos con el id: ${id} no existe.`);

			await programacion_modulos.update(body, {
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
			const response = await programacion_modulos.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La programacion_modulos con el id: ${id} que solicitas no existe `);

			await programacion_modulos.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
