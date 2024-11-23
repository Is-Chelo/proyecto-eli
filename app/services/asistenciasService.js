const {asistencias, registros, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			// Verifica si id_registro es undefined, null o 0
			if (!body.id_registro || body.id_registro === 0) {
				return BadRequest('El id_registro es inválido');
			}
	
			const response = await asistencias.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	

	async index(params = []) {
		try {
			const response = await asistencias.findAll({
				include: [{model: registros}],
			});
			return Successful(
				'Operacion Exitosa',
				response.map((item) => item.fromDataModel())
			);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},


	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await asistencias.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`asistencias con el id: ${id} no existe.`);
			}

			await asistencias.update(body, {
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
			const response = await asistencias.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La asistencias con el id: ${id} que solicitas no existe `);

			await asistencias.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async getAsistencia(id_registro,fecha) {
		console.log();
		try {
			let asistenciaQuery = 'SELECT * FROM asistencias WHERE 1=1';
	  
			if (id_registro) {
			  asistenciaQuery += ` AND id_registro = ${id_registro}`;
			}
		
			if (fecha) {
			  asistenciaQuery += ` AND DATE(fecha) = '${fecha}'`;
			}
		
			const asistenciaResult = await sequelize.query(asistenciaQuery);
		
			return Successful('Datos', asistenciaResult[0]);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
