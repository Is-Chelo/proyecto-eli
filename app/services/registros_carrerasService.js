const {registros_carreras, estudiantes, cursos} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = (await registros) - carreras.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await registros_carreras.findAll({
				include: [{model: estudiantes}, {model: cursos}],
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
			const response = await registros_carreras.findOne({
				where: {
					id: id,
				},
				include: [{model: estudiantes}, {model: cursos}],
			});

			if (!response)
				return NotFoundResponse(`registros-carreras con el id: ${id} no existe. `);

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await registros_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`registros-carreras con el id: ${id} no existe.`);
			}

			await registros_carreras.update(body, {
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
			const response = await registros_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(
					`La registros-carreras con el id: ${id} que solicitas no existe `
				);
			}

			await registros_carreras.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async getRegistrosByCurso(id_curso) {
		try {
			const response = await registros_carreras.findOne({
				where: {
					id_curso: id_curso,
				},
				include: [{model: estudiantes}, {model: cursos}],
			});

			if (!response)
				return NotFoundResponse(` El registro con ese id_curso: ${id_curso} no existe. `);

			const cursosResult = await cursos.findAll();
			const estudiantesResult = await estudiantes.findAll();
			// const personalResult = await connection.query(personalQuery);

			const registrosFormatted = Object.values(response).map((registro) => {
				const estudianteInfo = estudiantesResult.find(
					(estudiante) => estudiante.id === registro.id_estudiante
				);
				const carrera = cursosResult.find((curso) => curso.id === registro.id_curso);
				// const personalInfo = personalResult.find(
				// 	(personal) => personal.id === registro.id_personal
				// );

				return {
					...registro,
					estudiante: estudianteInfo,
					// personal: personalInfo,
					curso: carrera,
				};
			});
			return Successful('Operacion Exitosa', registrosFormatted);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
