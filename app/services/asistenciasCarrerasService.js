const {asistencias_carreras, registros, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await asistencias_carreras.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await asistencias_carreras.findAll({
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

	async show(id, params) {
		try {
			const id_registro_carrera = id;
			const {fecha} = params;

			let asistenciaQuery = `
					SELECT *
					FROM asistencias_carreras
					WHERE id_registro_carrera = ${id_registro_carrera}
				`;

			if (fecha) {
				asistenciaQuery += `AND fecha = ${fecha}`;
			}

			const asistenciaResult = await sequelize.query(
				asistenciaQuery,
				queryParams
			  );
			return Successful('Operacion Exitosa', asistenciaResult.fromDataModel());
		} catch (error) {
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await asistencias_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`asistencias_carreras con el id: ${id} no existe.`);
			}

			await asistencias_carreras.update(body, {
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
			const response = await asistencias_carreras.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La asistencias_carreras con el id: ${id} que solicitas no existe `);

			await asistencias_carreras.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// async getAsistencia(id_registro_carrera,id_asignatura,fecha) {
	// 	try {
	// 		let asistenciaQuery = 'SELECT * FROM asistencias_carreras WHERE 1=1';
	  
	// 		if (id_registro_carrera) {
	// 		  asistenciaQuery += ` AND id_registro_carrera = ${id_registro_carrera}`;
	// 		}
	// 		if (id_asignatura) {
	// 		  asistenciaQuery += ` AND id_asignatura = ${id_asignatura}`;
	// 		}
		
	// 		if (fecha) {
	// 		  asistenciaQuery += ` AND DATE(fecha) = '${fecha}'`;
	// 		}
		
	// 		const asistenciaResult = await sequelize.query(asistenciaQuery);
		
	// 		console.log('asistenciaResult', asistenciaResult,'con',asistenciaQuery);
	// 		return Successful('Datos', asistenciaResult[0]);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return InternalServer('Error en el servidor');
	// 	}
	// },
};
