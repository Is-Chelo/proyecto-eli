const { registros_carreras, estudiantes, cursos, sequelize } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const id_personal=body.id_personal?body.id_personal:null
			const fecha_registro=body.fecha_registro?body.fecha_registro:null
			const fecha_programacion=body.fecha_programacion?body.fecha_programacion:null
			const response = await registros_carreras.create({...body, fecha_programacion,id_personal,fecha_registro});
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await registros_carreras.findAll({
				include: [{ model: estudiantes }, { model: cursos }],
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
				include: [{ model: estudiantes }, { model: cursos }],
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
			const id_personal=body.id_personal?body.id_personal:null
			const fecha_registro=body.fecha_registro?body.fecha_registro:null
			const fecha_programacion=body.fecha_programacion?body.fecha_programacion:null
			const response = await registros_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`registros-carreras con el id: ${id} no existe.`);
			}
			if(body.fecha_programacion===''){
				newbody={...body, fecha_programacion,id_personal,fecha_registro}
		   }else{
			   
			   newbody={...body, fecha_programacion,id_personal,fecha_registro}
		   }

			await registros_carreras.update(newbody, {
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
				where: { id: id },
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
				include: [{ model: estudiantes }, { model: cursos }],
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

	async getRegistros(params) {
		try {
			const { id_estudiante, id_carrera, anio, id_asignatura} = params;

			const queryParams = [];
			let registrosQuery = `
			  SELECT *
			  FROM \`registros_carreras\`
			  `;

			if (anio) {
				queryParams.push(`anio LIKE '${anio}%'`);
			}
			if (id_estudiante) {
				queryParams.push(`id_estudiante = ${id_estudiante}`);
			}
			if (id_carrera) {
				queryParams.push(`id_curso = ${id_carrera}`);
			}
			if (id_asignatura) {
				queryParams.push(`FIND_IN_SET(${id_asignatura}, REPLACE(REPLACE(id_asignaturas, '[', ''), ']', ''))`);
			}
			
			
			if (queryParams.length > 0) {
				registrosQuery += ` WHERE ${queryParams.join(' AND ')}`;
			}


			registrosQuery += ';';
			console.log('registrosQuery',registrosQuery);

			const [registrosResult] = await sequelize.query(registrosQuery);

			const [cursosResult] = await sequelize.query(`
			SELECT *
			FROM carreras;
		  `);

			const [estudiantesResult] = await sequelize.query(`
			SELECT *
			FROM estudiantes;
		  `);

			const [personalResult] = await sequelize.query(`
			SELECT *
			FROM personals;
		  `);
			const [promocionesResult] = await sequelize.query(`
			SELECT *
			FROM promociones;
		  `);
			const [modulosResult] = await sequelize.query(`
			SELECT *
			FROM modulos;
		  `);
			const [cobranzasResult] = await sequelize.query('SELECT * FROM cobranzas_carreras');
			let asignatura = []
			if (anio) {
				//  [asignatura] = await sequelize.query(`SELECT * FROM asignaturas WHERE anio=${anio}`);
				[asignatura] = await sequelize.query(`SELECT asignaturas.*, modulos.*  FROM asignaturas INNER JOIN modulos ON asignaturas.id_modulo = modulos.id WHERE asignaturas.anio = ${anio}`);
			}




			const registrosFormatted = registrosResult.map((registro) => {
				const estudianteInfo = estudiantesResult.find(
					(estudiante) => estudiante.id === registro.id_estudiante
				);
				const carrera = cursosResult.find((curso) => curso.id === registro.id_curso);
				const personalInfo = personalResult.find(
					(personal) => personal.id === registro.id_personal
				);
				const promocion = promocionesResult.find(
					(promocion) => promocion.id === registro.id_promocion
				);
				const cobranzaInfo = cobranzasResult.find(
					(cobranza) => cobranza.id_registro_carrera === registro.id
				)
				const newregister = { ...registro, asignatura }

				return {
					...newregister,
					estudiante: estudianteInfo,
					personal: personalInfo,
					carrera,
					promocion,
					mensualidad: cobranzaInfo ? cobranzaInfo.mensualidad : null,
					id_cobranza: cobranzaInfo?.id,
				};
			});
			return Successful('Operacion Exitosa', registrosFormatted);

			// res.json(registrosFormatted);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
			// res.status(500).send(error.message);
		}
	},


};
