const {
	asignaturas,
	cursos,
	carreras,
	modulos,
	personal,
	aulas,
	sequelize,
	tipo_cursos,
} = require('../models/index');
const {InternalServer, NotFoundResponse, Successful} = require('../utils/response');

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
			const {anio, id_carrera} = params;
			const queryParams = [];
			let asignaturaQuery = `
				SELECT *
				FROM asignaturas
				`;

			if (anio) {
				queryParams.push(`anio = ${anio}`);
			}
			if (id_carrera) {
				queryParams.push(`id_carrera = ${id_carrera}`);
			}

			if (queryParams.length > 0) {
				asignaturaQuery += ` WHERE ${queryParams.join(' AND ')}`;
			}
			const [asignaturaResult] = await sequelize.query(asignaturaQuery);
			const [modulosResult] = await sequelize.query("SELECT * FROM modulos");
			const [carrerasResult] = await sequelize.query("SELECT * FROM carreras");
			const [aulasResult] = await sequelize.query("SELECT * FROM aulas");
			const [personalResult] = await sequelize.query('SELECT * FROM personals');

			const asignaturasFormatted = asignaturaResult.map((curso) => {
				const aulaInfo = Object.values(aulasResult).find(
					(aula) => aula.id === curso.id_aula
				);
				const carreras = Object.values(carrerasResult).find(
					(carrera) => carrera.id === curso.id_carrera
				);
				const moduloInfo = Object.values(modulosResult).find(
					(mod) => mod.id === curso.id_modulo
				);
				const personalInfo = Object.values(personalResult).find(
					(personal) => personal.id === curso.id_personal
				);
				const data_encargado = Object.values(personalResult).find(
					(personal) => personal.id === curso.encargado
				);
				console.log('encargado',aulaInfo);

				return {
					...curso,
					aula: aulaInfo,
					personal: personalInfo,
					modulos: moduloInfo,
					carreras,
					data_encargado,
				};
			});
			return Successful('Operacion Exitosa', asignaturasFormatted);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async show(id) {
		try {
			const asignaturaResult = await cursos.findOne({where: {id}});
			const tipoCursoResult = await tipo_cursos.findAll();
			const aulasResult = await aulas.findAll();
			const personalResult = await personal.findAll();

			const asignaturasFormatted = Object.values(asignaturaResult).map((curso) => {
				const tipoCursoInfo = Object.values(tipoCursoResult).find(
					(tipoCurso) => tipoCurso.id === curso.id_tipo_curso
				);
				const aulaInfo = Object.values(aulasResult).find(
					(aula) => aula.id === curso.id_aula
				);
				const personalInfo = Object.values(personalResult).find(
					(personal) => personal.id === curso.id_personal
				);

				return {
					...curso,
					tipo_curso: tipoCursoInfo,
					aula: aulaInfo,
					personal: personalInfo,
				};
			});
			return Successful('Operacion Exitosa', asignaturasFormatted);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
		}
	},

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
