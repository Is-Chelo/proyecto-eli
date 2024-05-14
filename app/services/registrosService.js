const { registros, estudiantes, cursos, sequelize, tipo_cursos, personal, asistencias, promociones } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');
const Filter = require('../utils/filter');
module.exports = {
	async create(body) {
		try {
			const id_personal = body.id_personal ? body.id_personal : null
			const fecha_registro = body.fecha_registro ? body.fecha_registro : null
			const fecha_programacion = body.fecha_programacion ? body.fecha_programacion : null
			const response = await registros.create({ ...body, fecha_programacion, id_personal, fecha_registro });

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async index(params = []) {
		try {
			const include =  [
				{ model: estudiantes },
				{ model: cursos },
				{ model: personal },
				{ model: promociones, as: 'promocion'},
				{ model: asistencias }
			]
			let response = await registros.findAll({
				include: include
			});
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, registros, include);
			}
	
			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
		}
	}
	
// 	async index(params = []) {
// 		try {
// 			const { id_estudiante, id_sucursal } = params;

// 			let registrosQuery = `
// 				SELECT *
// 				FROM registros
// 			`;

// 			if (id_estudiante) {
// 				registrosQuery += ` WHERE id_estudiante = ${id_estudiante}`;
// 			}
// 			if (id_sucursal) {
// 				registrosQuery += ` and id_sucursal = ${id_sucursal}`;
// 			}

// 			registrosQuery += ';';

// 			const [registrosResult] = await sequelize.query(registrosQuery);

// 			const cursosQuery = `
// 				SELECT *
// 				FROM cursos;
// 			`;
// 			const [cursosResult] = await sequelize.query(cursosQuery);

// 			const estudiantesQuery = `
// 				SELECT *
// 				FROM estudiantes;
// 			`;
// 			const [estudiantesResult] = await sequelize.query(estudiantesQuery);

// 			const personalQuery = `
// 				SELECT *
// 				FROM personals;
// 			`;
// 			const [personalResult] = await sequelize.query(personalQuery);
// 			const [promocionesResult] = await sequelize.query('SELECT * FROM promociones');
// 			const [asistenciasResult] = await sequelize.query(`
//     SELECT id_registro, MONTH(a.fecha) AS mes, COUNT(*) AS faltas 
//     FROM asistencias a 
//     WHERE a.asistencia = "F" 
//     GROUP BY MONTH(a.fecha), id_registro;
// `);

// 			const registrosFormatted = registrosResult.map((registro) => {
// 				const estudianteInfo = estudiantesResult.find(
// 					(estudiante) => estudiante.id === registro.id_estudiante
// 				);
// 				const cursoInfo = cursosResult.find((curso) => curso.id === registro.id_curso);
// 				const personalInfo = personalResult.find(
// 					(personal) => personal.id === registro.id_personal
// 				);
// 				const PromocionInfo = promocionesResult.find(
// 					(promocion) => promocion.id === registro.id_promocion
// 				);
// 				const asistencias = asistenciasResult.filter((asistencia) => asistencia.id_registro === registro.id);
// 				return {
// 					...registro,
// 					estudiante: estudianteInfo,
// 					personal: personalInfo,
// 					curso: cursoInfo,
// 					promocion: PromocionInfo,
// 					asistencias
// 				};
// 			});
// 			return Successful('Operacion Exitosa', registrosFormatted);
// 		} catch (error) {
// 			console.error(error);
// 			return InternalServer('Error en el servidor');
// 		}
// 	},

	// * funcion para listar un item
	
	,
	async show(id) {
		try {
			const response = await registros.findOne({
				where: {
					id: id,
				},
				include: [{ model: estudiantes }, { model: cursos }],
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
		const id_personal = body.id_personal ? body.id_personal : null
		const fecha_registro = body.fecha_registro ? body.fecha_registro : null
		const fecha_programacion = body.fecha_programacion ? body.fecha_programacion : null
		let newbody = null
		try {
			const response = await registros.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`registros con el id: ${id} no existe.`);
			}
			if (body.fecha_programacion === '') {
				newbody = { ...body, fecha_programacion: null, id_personal, fecha_registro }
			} else {

				newbody = { ...body, fecha_programacion, id_personal, fecha_registro }
			}

			await registros.update(newbody, {
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
				where: { id: id },
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
			const registrosResult = await sequelize.query(
				`SELECT * FROM registros WHERE id_curso = ${id_curso}`
			);
			if (!registrosResult)
				return NotFoundResponse(
					`El curso con ese id: ${id_curso} que solicitas no existe.`
				);

			const [cursosResult] = await sequelize.query('SELECT * FROM cursos');
			const [estudiantesResult] = await sequelize.query('SELECT * FROM estudiantes');
			const [personalResult] = await sequelize.query('SELECT * FROM personals');
			const [cobranzasResult] = await sequelize.query('SELECT * FROM cobranzas');
			const [promocionesResult] = await sequelize.query('SELECT * FROM promociones');

			const registrosFormatted = Object.values(registrosResult[0]).map((registro) => {
				const estudianteInfo = estudiantesResult.find(
					(estudiante) => estudiante.id === registro.id_estudiante
				);
				const cursoInfo = cursosResult.find((curso) => curso.id === registro.id_curso);

				const personalInfo = personalResult.find(
					(personal) => personal.id === registro.id_personal
				);
				const cobranzaInfo = cobranzasResult.find(
					(cobranza) => cobranza.id_registro === registro.id
				);
				const PromocionInfo = promocionesResult.find(
					(promocion) => promocion.id === registro.id_promocion
				);

				return {
					...registro,
					estudiante: estudianteInfo,
					personal: personalInfo,
					curso: cursoInfo,
					mensualidad: cobranzaInfo ? cobranzaInfo.mensualidad : null,
					id_cobranza: cobranzaInfo?.id,
					promocion: PromocionInfo,
				};
			});

			return Successful('Operacion Exitosa', registrosFormatted);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async getData(params = {}) {
		// console.log(params);
		try {

			let response = {}
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, registros, [{ model: cursos }]);
			}
			response = response.map(async registro => {
				const curso = await cursos.findByPk(registro.id_curso); // Busca el curso por su ID
				return {
					...registro.toJSON(), // Convierte el registro a objeto JSON
					curso: curso ? curso.toJSON() : null // Agrega los detalles completos del curso si existe
				};
			});
			
			response = await Promise.all(response);
			let totalInscritos = 0;
			let mktCap = 0;
			let mktFC = 0;
			let mktPreu = 0;
			let totalProgramados = 0;
			let totalNoProgramados = 0;
			let totalVigentes = 0;
			let totalAprobado = 0;
			let totalReprobado = 0;
			let totalCongelado = 0;
			let totalPendiente = 0;
			let totalAbandono = 0;
			let totalMB = 0;
			let totalReinc = 0;
			let totalTras = 0;
			let totalBecados = 0;
			let totalDeuda = 0;

			response.forEach(registro => {
				if (registro.fecha_registro) {
					totalInscritos++;
					if (registro.curso) {
						if (registro.curso.id_tipo_curso === 1) {
							mktCap++;
						}
						if (registro.curso.id_tipo_curso === 3) {
							mktPreu++;
						}
						if (registro.curso.id_tipo_curso === 4) {
							mktFC++;
						}
					}
				}
				if (!registro.estado) {
					totalNoProgramados++
				}
				if (registro.estado) {
					totalProgramados++;
					if (registro.condicion === 'Vigente') {
						totalVigentes++;
					}
					if (registro.condicion === 'En Deuda') {
						totalDeuda++;
					}
					if (registro.condicion === 'Aprobado') {
						totalAprobado++;
					}
					if (registro.condicion === 'Reprobado') {
						totalReprobado++;
					}
					if (registro.condicion === 'Congelado') {
						totalCongelado++;
					}
					if (registro.condicion === 'Pendiente') {
						totalPendiente++;
					}
					if (registro.condicion === 'Abandono') {
						totalAbandono++;
					}
					if (registro.condicioninicial === 'Becado') {
						totalBecados++;
					}
					if (registro.condicioninicial === 'Media Beca') {
						totalMB++;
					}
					if (registro.condicioninicial === 'Reincorporación') {
						totalReinc++;
					}
					if (registro.condicioninicial === 'Traspaso') {
						totalTras++;
					}
				}


			});
			let result = {
				totalInscritos,
				totalProgramados,
				totalBecados,
				totalVigentes,
				mktCap,
				mktPreu,
				mktFC,
				totalAprobado,
				totalReprobado,
				totalCongelado,
				totalPendiente,
				totalAbandono,
				totalMB,
				totalReinc,
				totalTras,
				totalBecados,
				totalDeuda,
				totalNoProgramados

			};
			return Successful(
				'Operacion Exitosa',
				result);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async getDataByMonth(params = {}) {
		console.log(params);
		try {
			// Obtener todos los tipos de cursos disponibles
			// let tiposCursos = await tipo_cursos.findAll({});

			// Consultar los registros y unirlos con la tabla de cursos

			let response = await registros.findAll({
				include: [{ model: cursos, include: [{ model: tipo_cursos }] }],
				// where: { id_sucursal: params.id_sucursal }
			});

			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, registros);
			}
	
			const registrosPorMes = {};
			response.forEach(registro => {
				if (registro.fecha_registro) {
					const mes = registro.fecha_registro.getMonth(); // Obtener el mes del registro
					const nombreTipoCurso = registro.curso ? registro.curso.tipo_curso.nombre : 'Sin curso';
					if (!registrosPorMes[nombreTipoCurso]) {
						registrosPorMes[nombreTipoCurso] = new Array(12).fill(0); // Inicializar con 0 registros para cada mes
					}
					registrosPorMes[nombreTipoCurso][mes]++; // Incrementar el conteo para el mes correspondiente
				}
			});

			// Preparar los datos en el formato necesario para el gráfico
			const datasets = [];
			Object.keys(registrosPorMes).forEach((nombreTipoCurso, index) => {
				const backgroundColor = this.obtenerColorTipoCurso(index); // Obtener el color del tipo de curso
				datasets.push({
					type: 'bar',
					label: nombreTipoCurso,
					backgroundColor,
					data: registrosPorMes[nombreTipoCurso]
				});
			});

			return Successful('Operacion Exitosa', datasets);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// Otras funciones...

	// Función para obtener el color del tipo de curso
	obtenerColorTipoCurso(indiceTipoCurso) {
		const colores = ['#06b6d4', '#eab308', '#85b2f9'];
		// Seleccionar el color del array según el índice del tipo de curso
		return colores[indiceTipoCurso % colores.length];
	}


};
