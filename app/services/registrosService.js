const { registros, estudiantes, cursos, aulas, tipo_cursos, personal, asistencias, promociones,  notas, cobranza } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');
const Filter = require('../utils/filter');
const { Op } = require('sequelize');
module.exports = {
	async create(body) {
		try {
			const {
				id_estudiante,
				id_curso,
				id_personal = null,
				fecha_registro = null,
				fecha_programacion = null
			} = body;
	
			// Convertir fecha_programacion a null si es una cadena vacía
			const fechaProgramacion = fecha_programacion === '' ? null : fecha_programacion;
			const fecha_Registro = fecha_registro === '' ? null : fecha_registro;
			const id_Personal = id_personal === '' ? null : id_personal;
	
			const existingRecord = await registros.findOne({
				where: {
					id_estudiante,
					id_curso
				}
			});
	
			if (existingRecord) {
				return BadRequest('El registro ya existe para este estudiante y curso');
			}
	
			const response = await registros.create({
				...body,
				fecha_programacion: fechaProgramacion,
				id_personal: id_Personal,
				fecha_registro: fecha_Registro
			});
	
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	}
	
	,

	async index(params = {}) {
		try {
			const include = [
				{ model: estudiantes },
				{ model: cursos, include: [{ model: tipo_cursos }, {model: aulas}] },
				{ model: personal },
				{ model: promociones, as: 'promocion' },
				{ model: asistencias },
				{ model: notas }
			];
	
			const queryOptions = {
				include: include,
				where: {},
				order: []
			};
	
			// Default order by 'fecha_registro' if no order parameter is passed
			if (!params.order) {
				queryOptions.order.push(['fecha_registro', 'DESC']);
			}
	
			if (params.id_sucursal) {
				queryOptions.where.id_sucursal = params.id_sucursal;
			}
			if (params.fecha_inicio && params.fecha_fin) {
				queryOptions.where.fecha_registro = {
					[Op.between]: [params.fecha_inicio, params.fecha_fin]
				};
			} else if (params.fecha_inicio) {
				queryOptions.where.fecha_registro = {
					[Op.gte]: params.fecha_inicio
				};
			} else if (params.fecha_fin) {
				queryOptions.where.fecha_registro = {
					[Op.lte]: params.fecha_fin
				};
			}
			if (params.condicion) {
				queryOptions.where.condicion = params.condicion;
			}
			if (params.id_curso) {
				queryOptions.where.id_curso = params.id_curso;
			}
	
			if (params.order) {
				queryOptions.order.push([{ model: estudiantes }, 'apellido', 'ASC']);
			}
	
			let response = await registros.findAll(queryOptions);
	
			const result = response.map(item => {
				const data = item.fromDataModel();
				
				if (data.notas && data.notas.length > 0) {
					const totalNotas = data.notas.reduce((sum, nota) => sum + nota.nota, 0);
					data.promedio_nota = totalNotas / data.notas.length;
				} else {
					data.promedio_nota = null; 
				}
	
				return {
					...data,
					promedio_nota: data.promedio_nota,
					notas: data.notas
				};
			});
	
	
			return Successful('Operacion Exitosa', result);
	
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
		}
	},
	async getList(params = {}) {
		try {
			console.log(params);
			
			const include = [
				{ model: estudiantes },
				{ model: cursos, include: [{ model: tipo_cursos }, {model: aulas}] },
				{ model: personal },
			
			];
	
			const queryOptions = {
				include: include,
				where: {},
				order: []
			};
	
			// Default order by 'fecha_registro' if no order parameter is passed
			if (!params.order) {
				queryOptions.order.push(['fecha_registro', 'DESC']);
			}
	
			if (params.id_sucursal) {
				queryOptions.where.id_sucursal = params.id_sucursal;
			}
			if (params.fecha_inicio && params.fecha_fin) {
				queryOptions.where.fecha_registro = {
					[Op.between]: [params.fecha_inicio, params.fecha_fin]
				};
			} else if (params.fecha_inicio) {
				queryOptions.where.fecha_registro = {
					[Op.gte]: params.fecha_inicio
				};
			} else if (params.fecha_fin) {
				queryOptions.where.fecha_registro = {
					[Op.lte]: params.fecha_fin
				};
			}
			if (params.condicion) {
				queryOptions.where.condicion = params.condicion;
			}
			if (params.id_curso) {
				queryOptions.where.id_curso = params.id_curso;
			}
	
		
	
			let response = await registros.findAll(queryOptions);
	
		
	
	
			return Successful('Operacion Exitosa', response.map(item=>item.fromDataModel()));
	
		} catch (error) {
			console.error(error);
			return InternalServer('Error en el servidor');
		}
	}
	
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
		console.log(body);
		
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

	//DASHBOARD
	async getData(params = {}) {
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
			let response = await registros.findAll({
				include: [{ model: cursos, include: [{ model: tipo_cursos }] }],
			});

			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, registros);
			}

			const registrosPorMes = {};
			response.forEach(registro => {
				if (registro.fecha_registro) {
					const mes = registro.fecha_registro.getMonth(); 
					const nombreTipoCurso = registro.curso ? registro.curso.tipo_curso.nombre : 'Sin curso';
					if (!registrosPorMes[nombreTipoCurso]) {
						registrosPorMes[nombreTipoCurso] = new Array(12).fill(0); 
					}
					registrosPorMes[nombreTipoCurso][mes]++; 
				}
			});

			const datasets = [];
			Object.keys(registrosPorMes).forEach((nombreTipoCurso, index) => {
				const backgroundColor = this.obtenerColorTipoCurso(index); 
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


	obtenerColorTipoCurso(indiceTipoCurso) {
		const colores = ['#06b6d4', '#eab308', '#85b2f9'];
		return colores[indiceTipoCurso % colores.length];
	}


};
