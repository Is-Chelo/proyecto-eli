const {programaciones, registros, cursos, estudiantes} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await programaciones.create(body);

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await programaciones.findAll({
				include: [{model: registros}],
			});

			const registrosResult = await registros.findAll();
			const cursosResult = await cursos.findAll();
			const estudiantesResult = await estudiantes.findAll();

			const programacionesFormatted = Object.values(response).map((programacion) => {
				const registroInfo = registrosResult.find(
					(registro) => registro.id === programacion.id_registro
				);
				const estudianteInfo = estudiantesResult.find(
					(estudiante) => estudiante.id === registroInfo.id_estudiante
				);
				const cursoInfo = cursosResult.find((curso) => curso.id === registroInfo.id_curso);
				// const personalInfo = personalResult.find(
				// 	(personal) => personal.id === registroInfo.id_personal
				// );

				return {
					...programacion,
					registro: registroInfo,
					estudiante: estudianteInfo,
					// personal: personalInfo,
					curso: cursoInfo,
				};
			});

			return Successful('Operacion Exitosa', programacionesFormatted);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await programaciones.findOne({
				where: {
					id: id,
				},
				include: [{model: registros}],
			});

			if (!response) return NotFoundResponse(`programaciones con el id: ${id} no existe. `);

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await programaciones.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`programaciones con el id: ${id} no existe.`);
			}

			await programaciones.update(body, {
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
			const response = await programaciones.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(
					`La programaciones con el id: ${id} que solicitas no existe `
				);
			}

			await programaciones.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
