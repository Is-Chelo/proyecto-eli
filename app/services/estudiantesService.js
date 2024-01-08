const {estudiantes} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			let devImageUrl = null;
			if (body.image_path) {
				const uploadDevResponse = await axios.post(
					'https://serverfilesdev.esam.edu.bo/v1/files/',
					{
						app: 'esam.certificados',
						base64: body.image_path,
					}
				);

				devImageUrl = uploadDevResponse.data.id;
			}

			const response = await estudiantes.create({...body, image_path: devImageUrl});

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await estudiantes.findAll({});

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await estudiantes.findOne({
				where: {
					id: id,
				},
			});
			if (!response) return NotFoundResponse(`estudiantes con el id: ${id} no existe. `);
			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await estudiantes.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`estudiantes con el id: ${id} no existe.`);

			await estudiantes.update(body, {
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
			const response = await estudiantes.findOne({
				where: {
					id: id,
				},
			});

			if (!response)
				return NotFoundResponse(`La estudiantes con el id: ${id} que solicitas no existe `);

			await estudiantes.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
