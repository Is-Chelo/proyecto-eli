const { cursos, aulas, tipo_cursos, modulos, plan_estudios, personal,  registros } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');
const Filter = require('../utils/filter');

module.exports = {
	async create(body) {
		try {
			const newbody = {
				...body,
				precio_cuotas: body.precio_cuotas === '' ? null : body.precio_cuotas,
				precio_contado: body.precio_contado === '' ? null : body.precio_cuota,
				encargado: body.encargado === '' ? null : body.encargado
			}
			const response = await cursos.create(newbody);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const include = [
				{ model: tipo_cursos },
				{ model: aulas },
				{ model: personal },
				{ model: registros,
					required: false, 
					attributes: ['estado'], 
				},
			];
	
			let response = await cursos.findAll({ include: include, order: [
				['createdAt', 'DESC']
			] });
	
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, cursos, include, [['createdAt', 'DESC']]);
			}
	
			const calcularEstado = (fechaInicio, fechaFin) => {
				const ahora = new Date();
				const inicio = new Date(fechaInicio);
				const fin = new Date(fechaFin);
	
				if (ahora < inicio) {
					return 'Inscripciones';
				} else if (ahora >= inicio && ahora <= fin) {
					return 'Desarrollo';
				} else {
					return 'Concluido';
				}
			};
	
			const formattedResponse = response.map((item) => {
				const dataModel = item.fromDataModel();
	
				const inscritos = item.registros.length
				const programados = item.registros.filter(registro => registro.estado === true).length 
	
				return {
					...dataModel,
					estado: calcularEstado(item.fecha_inicio, item.fecha_fin),
					inscritos, 
					programados 
				};
			});
	
			return Successful(
				'Operación Exitosa',
				formattedResponse
			);
	
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
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
					{ model: aulas },
					{ model: tipo_cursos },
					{ model: modulos },
					{ model: plan_estudios },
					{ model: personal },
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
			const newbody = {
				...body,
				precio_cuotas: body.precio_cuotas === '' ? null : body.precio_cuotas,
				precio_contado: body.precio_contado === '' ? null : body.precio_cuota,
				encargado: body.encargado === '' ? null : body.encargado
			}
			const response = await cursos.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`cursos con el id: ${id} no existe.`);

			await cursos.update(newbody, {
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
				where: { id: id },
			});
			return Successful('Registro eliminado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	
};
