const {colores, registros, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await colores.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		console.log('index');
		try {
			const response = await colores.findAll();
			return Successful(
				'Operacion Exitosa',
				response.map((item) => item.fromDataModel())
			);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id, params) {
		try {
			const id_curso = id;
			const {fecha} = params;
			let query = 'SELECT * FROM colores WHERE 1=1';
	  
			if (id_curso) {
			  query += ` AND id_curso = ${id_curso}`;
			}
		
			if (fecha) {
			  query += ` AND DATE(fecha) = '${fecha}'`;
			}
		
			const asistenciaResult = await sequelize.query(query);
		
			// console.log('asistenciaResult', asistenciaResult,'con',query);
			return Successful('Datos', asistenciaResult[0]);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},


	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await colores.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`colores con el id: ${id} no existe.`);
			}

			await colores.update(body, {
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
			const response = await colores.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La colores con el id: ${id} que solicitas no existe `);

			await colores.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	
	
	async getModulos(color, fechaInicio, fechaFin) {
		try {
			let query = `SELECT c.id, c.nombre, c.modalidad, m.fecha
			FROM colores m
			INNER JOIN cursos c ON m.id_curso = c.id
			WHERE 1=1`;
	
			if (color) {
				query += ` AND m.color = '${color}'`;
			}
	
			if (fechaInicio !== undefined && fechaFin !== undefined) {
				query += ` AND DATE(m.fecha) BETWEEN '${fechaInicio}' AND '${fechaFin}'`;
			} else if (fechaInicio !== undefined && fechaFin === undefined) {
				query += ` AND DATE(m.fecha) >= '${fechaInicio}'`;
			} else if (fechaInicio === undefined && fechaFin !== undefined) {
				query += ` AND DATE(m.fecha) <= '${fechaFin}'`;
			}
	
			const asistenciaResult = await sequelize.query(query);
	
			return Successful('Datos', asistenciaResult[0]);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	
	
	
};
