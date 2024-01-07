const {personal, sequelize} = require('../models/index');
const Filter = require('../utils/filter');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const {
				id_rol,
				apellido_paterno,
				apellido_materno,
				nombres,
				telefono,
				correo_electronico,
				numero_de_cuenta,
				tipo_de_cuenta,
				banco,
				ci,
				carrera_o_curso,
				pago_por_hora,
				fecha_de_nacimiento,
				profesion,
				universidad,
			} = body;
			if (
				id_rol == undefined ||
				apellido_paterno == undefined ||
				apellido_materno == undefined ||
				nombres == undefined ||
				ci == undefined ||
				correo_electronico == undefined
			) {
				res.status(400).json({
					message: 'Bad request. Please fill all field',
				});
			}
			const personal = {
				id_rol,
				apellido_paterno,
				apellido_materno,
				nombres,
				telefono,
				correo_electronico,
				numero_de_cuenta,
				tipo_de_cuenta,
				banco,
				ci,
				carrera_o_curso,
				pago_por_hora,
				fecha_de_nacimiento,
				profesion,
				universidad,
			};
			const result = await sequelize.query('INSERT INTO personal SET ?', personal);
			// res.json({message: 'Personal type added'});
			return Successful("Personal type added", []);
		} catch (error) {
			res.status(500);
			res.send(error.message);
		}
	},

	async index(params = []) {
		try {
			let response = await personal.findAll({});

			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, personal);
			}

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await personal.findOne({
				where: {
					id: id,
				},
			});
			if (!response) return NotFoundResponse(`Personal con el id: ${id} no existe. `);
			return Successful('Operacion Exitosa', response.fromDataModel());
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await personal.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`personal con el id: ${id} no existe.`);
			console.log(response);

			await personal.update(body, {
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
			const response = await personal.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La personal con el id: ${id} que solicitas no existe `);

			await personal.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
