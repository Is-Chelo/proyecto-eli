const {response} = require('express');
const {asignaturas, cursos, carreras, modulos, aulas, sequelize, tipo_cursos} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await asignaturas.create(body);

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const {anio} = params;
			const queryParams = [];
			let cursosQuery = `
				SELECT *
				FROM asignaturas
				`;

			if (anio) {
				queryParams.push(`anio = ${anio}`);
			}

			if (queryParams.length > 0) {
				cursosQuery += ` WHERE ${queryParams.join(' AND ')}`;
			}

			const [cursosResult] = await sequelize.query(cursosQuery);

			const [modulosResult] = await modulos.findAll();
			const [carrerasResult] = await carreras.findAll();
			const [aulasResult] = await aulas.findAll();
			// const [personalResult] = await sequelize.query('SELECT * FROM personal');

			const cursosFormatted = cursosResult.map((curso) => {
				const aulaInfo = Object.values(aulasResult).find(
					(aula) => aula.id === curso.id_aula
				);
				const carreras = Object.values(carrerasResult).find(
					(carrera) => carrera.id === curso.id_carrera
				);
				const moduloInfo = Object.values(modulosResult).find(
					(mod) => mod.id === curso.id_modulo
				);
				// const personalInfo = personalResult.find(
				// 	(personal) => personal.id === curso.id_personal
				// );
				// const encargado = personalResult.find(
				// 	(personal) => personal.id === curso.encargado
				// );

				return {
					...curso,
					aula: aulaInfo,
					// personal: personalInfo,
					modulos: moduloInfo,
					carreras,
					// encargado,
				};
			});
			return Successful('Operacion Exitosa', cursosFormatted);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		// try {
		// 	const response = await asignaturas.findOne({
		// 		where: {
		// 			id: id,
		// 		},
		// 		include: [{model: carreras}, {model: modulos}, {model: aulas}],
		// 	});

		// 	if (!response) return NotFoundResponse(`asignaturas con el id: ${id} no existe. `);

		// 	return Successful('Operacion Exitosa', response);
		// } catch (error) {
		// 	console.log(error);
		// 	return InternalServer('Error en el servidor');
		// }
		try {
			const cursosResult = cursos.findOne({where:{id}})
			// `
			// 		SELECT *
			// 		FROM cursos WHERE cursos.id = ${id};
			// 	`;
			// const cursosResult = await sequelize.query(cursosQuery);

			// const tipoCursoQuery = `
			// 		SELECT *
			// 		FROM tipo_cursos;
			// 	`;
			const tipoCursoResult = await tipo_cursos.findAll();

			// const aulasQuery = `
			// 		SELECT *
			// 		FROM aulas;
			// 	`;
			const aulasResult = await aulas.findAll();

			// const personalQuery = `
			// 		SELECT *
			// 		FROM personal;
			// 	`;
			// const personalResult = await sequelize.query(personalQuery);
			const cursosFormatted = Object.values(cursosResult).map((curso) => {
				const tipoCursoInfo = Object.values(tipoCursoResult).find(
					(tipoCurso) => tipoCurso.id === curso.id_tipo_curso
				);
				const aulaInfo = Object.values(aulasResult).find((aula) => aula.id === curso.id_aula);
				// const personalInfo = personalResult.find(
				// 	(personal) => personal.id === curso.id_personal
				// );

				return {
					...curso,
					tipo_curso: tipoCursoInfo,
					aula: aulaInfo,
					// personal: personalInfo,
				};
			});
			return Successful('Operacion Exitosa', cursosFormatted);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await asignaturas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`asignaturas con el id: ${id} no existe.`);

			await asignaturas.update(body, {
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
			const response = await asignaturas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La asignaturas con el id: ${id} que solicitas no existe `);
			}

			await asignaturas.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
