const {asignaturas, carreras, modulos, aulas} = require('../models/index');
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
			if (params.anio !== undefined) {
				const response = await asignaturas.findAll({
					include: [{model: carreras}, {model: modulos}, {model: aulas}],
				});
			} else {
				const response = await asignaturas.findAll({
					where: {
						anio: anio,
					},
					include: [{model: carreras}, {model: modulos}, {model: aulas}],
				});
			}

			// const cursosResult = await cursos.findAll();
			const modulosResult = await modulos.findAll();
			const carrerasResult = await carreras.findAll();
			const aulasResult = await aulas.findAll();

			// const [personalResult] = await connection.findAll('SELECT * FROM personal');

			const cursosFormatted = Object.values(asignaturas).map((curso) => {
				const aulaInfo = aulasResult.find((aula) => aula.id === curso.id_aula);
				const carreras = carrerasResult.find((carrera) => carrera.id === curso.id_carrera);
				const moduloInfo = modulosResult.find((mod) => mod.id === curso.id_modulo);
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
		try {
			const response = await asignaturas.findOne({
				where: {
					id: id,
				},
				include: [{model: carreras}, {model: modulos}, {model: aulas}],
			});

			if (!response) return NotFoundResponse(`asignaturas con el id: ${id} no existe. `);

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
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
