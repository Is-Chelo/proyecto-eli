const {programaciones, registros, cursos, estudiantes, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		// try {
		// 	const response = await programaciones.create(body);

		// 	return Successful('Item Registrado', response);
		// } catch (error) {
		// 	console.log(error);
		// 	return InternalServer('Error en el servidor');
		// }

		try {
			const {id_registro} = body;

			if (id_registro === undefined) {
				return BadRequest('Bad request. Please fill all fields', [
					'Bad request. Please fill all fields',
				]);
				// res.status(400).json({
				// 	message: 'Bad request. Please fill all fields',
				// });
				// return;
			}

			const programacion = {id_registro};

			// const connection = await getConnection();

			await sequelize.beginTransaction();

			try {
				await sequelize.query('INSERT INTO programacion SET ?', programacion);

				await sequelize.query('UPDATE registros SET estado = 1 WHERE id = ?', [
					id_registro,
				]);

				await sequelize.commit();

				return Successful('Programacion type added and registro state updated', []);
				// res.json({
				// 	message: 'Programacion type added and registro state updated',
				// });
			} catch (error) {
				await sequelize.rollback();
				throw error;
			} finally {
				sequelize.release();
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	async index(params = []) {
		// try {
		// 	const response = await programaciones.findAll({
		// 		include: [{model: registros}],
		// 	});

		// 	const registrosResult = await registros.findAll();
		// 	const cursosResult = await cursos.findAll();
		// 	const estudiantesResult = await estudiantes.findAll();

		// 	const programacionesFormatted = Object.values(response).map((programacion) => {
		// 		const registroInfo = registrosResult.find(
		// 			(registro) => registro.id === programacion.id_registro
		// 		);
		// 		const estudianteInfo = estudiantesResult.find(
		// 			(estudiante) => estudiante.id === registroInfo.id_estudiante
		// 		);
		// 		const cursoInfo = cursosResult.find((curso) => curso.id === registroInfo.id_curso);
		// 		// const personalInfo = personalResult.find(
		// 		// 	(personal) => personal.id === registroInfo.id_personal
		// 		// );

		// 		return {
		// 			...programacion,
		// 			registro: registroInfo,
		// 			estudiante: estudianteInfo,
		// 			// personal: personalInfo,
		// 			curso: cursoInfo,
		// 		};
		// 	});

		// 	return Successful('Operacion Exitosa', programacionesFormatted);
		// } catch (error) {
		// 	console.log(error);
		// 	return InternalServer('Error en el servidor');
		// }

		try {
			const programacionQuery = `
					SELECT *
					FROM programaciones;
				`;
			const programacionResult = await sequelize.query(programacionQuery);

			const registrosQuery = `
					SELECT *
					FROM registros;
				`;
			const registrosResult = await sequelize.query(registrosQuery);

			const cursosQuery = `
					SELECT *
					FROM cursos;
				`;
			const cursosResult = await sequelize.query(cursosQuery);

			const estudiantesQuery = `
					SELECT *
					FROM estudiantes;
				`;

			const estudiantesResult = await sequelize.query(estudiantesQuery);

			const personalQuery = `
					SELECT *
					FROM personals;
				`;
			const personalResult = await sequelize.query(personalQuery);

			const programacionesFormatted = Object.values(programacionResult).map(
				(programacion) => {
					const registroInfo = Object.values(registrosResult).find(
						(registro) => registro.id === programacion.id_registro
					);
					const estudianteInfo = Object.values(estudiantesResult).find(
						(estudiante) => estudiante.id === registroInfo.id_estudiante
					);
					const cursoInfo = Object.values(cursosResult).find(
						(curso) => curso.id === registroInfo.id_curso
					);
					const personalInfo = personalResult.find(
						(personal) => personal.id === registroInfo.id_personal
					);

					return {
						...programacion,
						registro: registroInfo,
						estudiante: estudianteInfo,
						personal: personalInfo,
						curso: cursoInfo,
					};
				}
			);
			return Successful('Operacion Exitosa', programacionesFormatted);
			// res.json(programacionesFormatted);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
			// res.status(500).send(error.message);
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
