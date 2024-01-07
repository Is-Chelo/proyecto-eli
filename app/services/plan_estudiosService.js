const {plan_estudios, carreras, modulos, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await plan_estudios.create(body);

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		// try {
		// 	const response = await plan_estudios.findAll({
		// 		include: [{model: carreras}, {model: modulos}],
		// 	});

		// 	return Successful('Operacion Exitosa', response);
		// } catch (error) {
		// 	console.log(error);
		// 	return InternalServer('Error en el servidor');
		// }

		try {
			// const connection = await getConnection();
			const {anio} = params;
			const queryParams = [];
			let planQuery = 'SELECT * FROM plan_estudios';

			if (anio) {
				planQuery += `WHERE anio = ${anio}`;
				// queryParams.push(anio);
			}

			const [planEstudio] = await sequelize.query(planQuery);

			const [modulosREsult] = await modulos.findAll();
			//  .query('SELECT * FROM modulos');

			const dataFormat = planEstudio.map((item) => {
				let moduloData = [];

				try {
					const idModulosArray = JSON.parse(item.id_modulos);
					moduloData = idModulosArray.map((moduleId) =>
						Object.values(modulosREsult).find((mod) => mod.id === moduleId)
					);
				} catch (error) {
					console.error('Error parsing JSON:', error);
				}

				return {
					...item,
					modulos: moduloData,
				};
			});
			return Successful('Operacion Exitosa', dataFormat[0]);
			// res.json(dataFormat[0]);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
			// res.status(500).send(error.message);
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await plan_estudios.findOne({
				where: {
					id: id,
				},
				include: [{model: carreras}, {model: modulos}],
			});

			if (!response) return NotFoundResponse(`plan_estudios con el id: ${id} no existe. `);

			return Successful('Operacion exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await plan_estudios.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`plan_estudios con el id: ${id} no existe.`);

			await plan_estudios.update(body, {
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
			const response = await plan_estudios.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(
					`La plan_estudios con el id: ${id} que solicitas no existe `
				);

			await plan_estudios.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
