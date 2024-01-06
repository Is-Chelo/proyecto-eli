const {asistencias, registros} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await asistencias.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await asistencias.findAll({
				include: [{model: registros}],
			});

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await asistencias.findOne({
				where: {
					id: id,
				},
				include: [{model: registros}],
			});

			if (!response) return NotFoundResponse(`asistencias con el id: ${id} no existe. `);

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await asistencias.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`asistencias con el id: ${id} no existe.`);
			}

			await asistencias.update(body, {
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
			const response = await asistencias.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La asistencias con el id: ${id} que solicitas no existe `);

			await asistencias.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async getAsistencia(id_registro) {
		try {
			// TODO: FALTA LA FECHA
			const response = await asistencias.findOne({
				where: {
					id_registro: id_registro,
				},
				include: [{model: registros}],
			});

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
