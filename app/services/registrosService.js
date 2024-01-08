const {registros, estudiantes, cursos, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await registros.create(body);

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const {id_estudiante} = params;

			let registrosQuery = `
				SELECT *
				FROM registros
			`;

			if (id_estudiante) {
				registrosQuery += ` WHERE id_estudiante = ${id_estudiante}`;
			}

			registrosQuery += ';';

			const [registrosResult] = await sequelize.query(registrosQuery);

			const cursosQuery = `
				SELECT *
				FROM cursos;
			`;
			const [cursosResult] = await sequelize.query(cursosQuery);

			const estudiantesQuery = `
				SELECT *
				FROM estudiantes;
			`;
			const [estudiantesResult] = await sequelize.query(estudiantesQuery);

			const personalQuery = `
				SELECT *
				FROM personals;
			`;
			const [personalResult] = await sequelize.query(personalQuery);

			const registrosFormatted = registrosResult.map((registro) => {
				const estudianteInfo = estudiantesResult.find(
					(estudiante) => estudiante.id === registro.id_estudiante
				);
				const cursoInfo = cursosResult.find((curso) => curso.id === registro.id_curso);
				const personalInfo = personalResult.find(
					(personal) => personal.id === registro.id_personal
				);

				return {
					...registro,
					estudiante: estudianteInfo,
					personal: personalInfo,
					curso: cursoInfo,
				};
			});
			return Successful('Operacion Exitosa', registrosFormatted);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await registros.findOne({
				where: {
					id: id,
				},
				include: [{model: estudiantes}, {model: cursos}],
			});

			if (!response) return NotFoundResponse(`registros con el id: ${id} no existe. `);

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await registros.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`registros con el id: ${id} no existe.`);
			}

			await registros.update(body, {
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
			const response = await registros.findOne({
				where: {
					id: id,
				},
			});
			if (!response)
				NotFoundResponse(`La registros con el id: ${id} que solicitas no existe `);

			await registros.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * Funcion para ver curso
	async getRegistrosByCurso(id_curso) {
		try {
			const registrosResult = await registros.findOne({
				where: {
					id_curso: id_curso,
				},
			});

			if (!registrosResult)
				return NotFoundResponse(
					`El curso con ese id: ${id_curso} que solicitas no existe.`
				);

			const cursosResult = await cursos.findAll();
			const estudiantesResult = await estudiantes.findAll();

			// TODO: FALTA EL PERSONAL
			const [personalResult] = await sequelize.query('SELECT * FROM personals');

			const registrosFormatted = Object.values(registrosResult).map((registro) => {
				const estudianteInfo = estudiantesResult.find(
					(estudiante) => estudiante.id === registro.id_estudiante
				);
				const cursoInfo = cursosResult.find((curso) => curso.id === registro.id_curso);

				const personalInfo = personalResult.find(
					(personal) => personal.id === registro.id_personal
				);

				return {
					...registro,
					estudiante: estudianteInfo,
					personal: personalInfo,
					curso: cursoInfo,
				};
			});

			return Successful('Operacion Exitosa', registrosFormatted);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
