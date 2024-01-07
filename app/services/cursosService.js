const {cursos, aulas, tipo_cursos, modulos, plan_estudios, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await cursos.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		// try {
		// 	const response = await cursos.findAll({
		// 		include: [
		// 			{model: aulas},
		// 			{model: tipo_cursos},
		// 			{model: modulos},
		// 			{model: plan_estudios},
		// 		],
		// 	});

		// 	return Successful('Operacion Exitosa', response);
		// } catch (error) {
		// 	console.log(error);
		// 	return InternalServer('Error en el servidor');
		// }
		// ! CORREGIR CON SEQUELIZE
		try {
			const [cursosResult] = await sequelize.query(`
				SELECT *
				FROM cursos;
				`);

			const [tipoCursoResult] = await sequelize.query(`
				SELECT *
				FROM tipo_cursos;
				`);

			const [aulasResult] = await sequelize.query(`
				SELECT *
				FROM aulas;
				`);

			const [personalResult] = await sequelize.query(`
				SELECT *
				FROM personal;
				`);

			const cursosFormatted = cursosResult.map((curso) => {
				const tipoCursoInfo = tipoCursoResult.find(
					(tipoCurso) => tipoCurso.id === curso.id_tipo_curso
				);
				const aulaInfo = aulasResult.find((aula) => aula.id === curso.id_aula);
				const personalInfo = personalResult.find(
					(personal) => personal.id === curso.id_personal
				);

				return {
					...curso,
					tipo_curso: tipoCursoInfo,
					aula: aulaInfo,
					personal: personalInfo,
				};
			});
			return Successful('Operacion Exitosa', cursosFormatted);
			// res.json(cursosFormatted);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
			// res.status(500).send(error.message);
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await cursos.findOne({
				where: {
					id: id,
				},
				include: [
					{model: aulas},
					{model: tipo_cursos},
					{model: modulos},
					{model: plan_estudios},
				],
			});

			if (!response) return NotFoundResponse(`cursos con el id: ${id} no existe. `);
			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await cursos.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`cursos con el id: ${id} no existe.`);

			await cursos.update(body, {
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
			const response = await cursos.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La cursos con el id: ${id} que solicitas no existe `);

			await cursos.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
