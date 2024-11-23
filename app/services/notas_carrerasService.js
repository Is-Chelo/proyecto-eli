const { notas_carreras, asignaturas, registros_carreras, sequelize } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');
const Filter = require('../utils/filter');
module.exports = {
	async create(body) {
		try {
			const response = await notas_carreras.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},


	async index(params = []) {
		try {
			let response = await notas_carreras.findAll({});
			
			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, notas_carreras);
			}
			return Successful(
				'Operacion Exitosa',
				response
			);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	// * funcion para listar un item
	// async show(id_registro_carrera, id_asignatura,casilla) {

	// 	try {
	// 		let notas_carrerasQuery = 'SELECT * FROM notas_carreras WHERE 1=1';
	// 		if (id_registro_carrera) {
	// 			notas_carrerasQuery += ` AND id_registro_carrera = ${id_registro_carrera}`;
	// 		}
	// 		if (id_asignatura) {
	// 			notas_carrerasQuery += ` AND id_asignatura = ${id_asignatura}`;
	// 		}
	// 		if (casilla) {
	// 			notas_carrerasQuery += ` AND casilla = ${casilla}`;
	// 		}
	// 		const response = await sequelize.query(notas_carrerasQuery);

	// 		if (!response) return NotFoundResponse(`notas_carreras con el id: ${id_registro_carrera} no existe. `);

	// 		return Successful('Operacion Exitosa', response[0]);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return InternalServer('Error en el servidor');
	// 	}
	// },
	async show(id) {
		try {
			const response = await notas_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`notas_carreras con el id: ${id} no existe. `);
			}
			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async update(id, body) {
		try {
			const response = await notas_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`notas_carreras con el id: ${id} no existe.`);
			}

			await notas_carreras.update(body, {
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
			const response = await notas_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La notas_carreras con el id: ${id} que solicitas no existe `);
			}

			await notas_carreras.destroy({
				where: { id: id },
			});
			return Successful('Registro Eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},



};
