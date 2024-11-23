const { registros_carreras, estudiantes, cursos, personal, carreras, aulas, sequelize, asistencias_carreras, asignaturas, notas_carreras } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');
const Filter = require('../utils/filter');
const { Op } = require('sequelize');

module.exports = {
	async create(body) {
		try {
			const id_personal = body.id_personal ? body.id_personal : null
			const fecha_registro = body.fecha_registro ? body.fecha_registro : null
			const fecha_programacion = body.fecha_programacion ? body.fecha_programacion : null
			const response = await registros_carreras.create({ ...body, fecha_programacion, id_personal, fecha_registro });
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async getList(params = []) {
		try {
		
	
			const include = [
				{ model: estudiantes },
				{ model: carreras },
				{ model: personal },
			];
			let condition = {};
	
			if (params.id_asignaturas) {
				condition.id_asignaturas = { [Op.contains]: [params.id_asignaturas] };
			}
		
	
			let response = await registros_carreras.findAll({
				include: include,
				order:  [['createdAt', 'DESC']] // Siempre se envía orderAux, que puede contener solo el predeterminado o ambos
			});
	
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, registros_carreras, include,  [['createdAt', 'DESC']]);
			}
	
			return Successful('Operacion Exitosa', response.map(item => item.fromDataModel()));
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	
	async index(params = []) {
		try {
			const order = params.order === 'true';
			delete params.order;
	
			// Definir las asociaciones para incluir en la consulta
			const include = [
				{ model: estudiantes },
				{ model: carreras },
				{ model: personal },
				{
					model: notas_carreras,
					required: false, // Incluye notas aunque no haya notas asociadas
					where: params.id_asignaturas ? { id_asignatura: params.id_asignaturas } : {}, // Filtra por asignatura si está presente
				},
				{
					model: asistencias_carreras,
					required: false, // Incluye notas aunque no haya notas asociadas
					where: params.id_asignaturas ? { id_asignatura: params.id_asignaturas } : {}, // Filtra por asignatura si está presente
				},
			];
	
			let condition = {};
	
			// Cambiar el filtro para MariaDB
			if (params.id_asignaturas) {
				condition.id_asignaturas = params.id_asignaturas; // Usa el valor directamente para la comparación
			}
	
			let orderAux;
			if (order) {
				orderAux = [[{ model: estudiantes }, 'apellido', 'ASC']];
			} else {
				orderAux = [['createdAt', 'DESC']];
			}
	
			// Consulta de registros con inclusión de notas_carreras
			let response = await registros_carreras.findAll({
				include: include,
				order: orderAux, // Siempre se envía orderAux, que puede contener solo el predeterminado o ambos
				where: condition
			});
	
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, registros_carreras, include, orderAux);
			}
	
			return Successful('Operacion Exitosa', response.map(item => item.fromDataModel()));
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	}
	
	

	,
	// * funcion para listar un item
	async show(id) {
		try {
			const response = await registros_carreras.findOne({
				where: {
					id: id,
				},
				include: [{ model: estudiantes }, { model: carreras }],
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
			const id_personal = body.id_personal ? body.id_personal : null
			const fecha_registro = body.fecha_registro ? body.fecha_registro : null
			const fecha_programacion = body.fecha_programacion ? body.fecha_programacion : null
			const response = await registros_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`registros-carreras con el id: ${id} no existe.`);
			}
			if (body.fecha_programacion === '') {
				newbody = { ...body, fecha_programacion, id_personal, fecha_registro }
			} else {

				newbody = { ...body, fecha_programacion, id_personal, fecha_registro }
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

};
