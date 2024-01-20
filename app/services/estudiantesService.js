const { estudiantes } = require('../models/index');
const { InternalServer, NotFoundResponse, BadRequest, Successful } = require('../utils/response');
const AuthServices = require('./AuthServices');
module.exports = {
	async create(body) {

		try {
			const {
				apellido,
				nombre,
				celular,
				correo,
				ci,
				genero,
				inscrito,
				image_path,
				fecha_nac,

			} = body
			if (
				apellido == undefined ||
				nombre == undefined ||
				ci == undefined ||
				correo == undefined
			) {
				return BadRequest('Bad request. Please fill all field', []);
			}

			const dataForUser = {
				name: nombre,
				last_name: apellido,
				email: correo,
				cellphone: celular,
				ci_number: ci,
				picture_image: image_path,
				username: ci,
				password: ci,
				active: true,
				date_birth: fecha_nac,
				id_rol: 7,
			};
			const userCreated = await AuthServices.createUser(dataForUser);
		
			
			if (userCreated.status) {
				const dataForEstudent = {
					apellido,
					nombre,
					celular,
					correo,
					ci,
					genero,
					inscrito,
					image_path,
					fecha_nac,
					id_user: userCreated.data.dataValues.id,
				}
				const response = await estudiantes.create(dataForEstudent);
				return Successful('Personal type added', response);
			} else {
				return userCreated;
			}
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
	// async update(id, body) {
	// 	try {
	// 		let devImageUrl = null;

	// 		if (body.image_path) {
	// 			try {
	// 				console.log('Subiendo imagen al servidor de archivos...');
	// 				const uploadDevResponse = await axios.post(
	// 					'https://serverfilesdev.esam.edu.bo/v1/files/',
	// 					{
	// 						app: 'esam.certificados',
	// 						base64: body.image_path,
	// 					}
	// 				);

	// 				devImageUrl = uploadDevResponse.data.id;
	// 				console.log('Imagen subida exitosamente:', devImageUrl);
	// 			} catch (uploadError) {
	// 				console.error('Error al subir la imagen al servidor de archivos:', uploadError);
	// 				throw new Error('Error al subir la imagen al servidor de archivos');
	// 			}
	// 		}

	// 		console.log('Buscando estudiante en la base de datos...');
	// 		const response = await estudiantes.findOne({
	// 			where: {
	// 				id: id,
	// 			},
	// 		});

	// 		if (!response) {
	// 			throw new Error(`estudiantes con el id: ${id} no existe.`);
	// 		}

	// 		console.log('Actualizando estudiante en la base de datos...');
	// 		await response.update({ ...body, image_path: devImageUrl });

	// 		console.log('Registro actualizado exitosamente');

	// 		return Successful('Registro actualizado', []);
	// 	} catch (error) {
	// 		console.error('Error en la actualización del estudiante:', error);
	// 		return InternalServer('Error en el servidor');
	// 	}
	// }
	// ,

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
				where: { id: id },
			});
			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
