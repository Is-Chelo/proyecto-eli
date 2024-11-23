const { estudiantes } = require('../models/index');
const { user } = require('../models/index');
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
				id_sucursal,
				register_by

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
				id_sucursal,
				register_by,
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
					id_sucursal,
					register_by,
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
			const {id_sucursal}=params
			const response = await estudiantes.findAll({
				where: {
					id_sucursal: id_sucursal
				},
				include: [
					{
						model: user,
						as: 'registrado_por',
						attributes: ['id', 'name', 'last_name', 'email'],
					},
					
				],
				order: [
					['createdAt', 'DESC']
				]
			});
			
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
			const student = await estudiantes.findOne({
				where: {
					id: id,
				},
			});

			if (!student) return NotFoundResponse(`Student with id: ${id} does not exist.`);

			await estudiantes.update(body, {
				where: {
					id: id,
				},
			});

			const userDataToUpdate = {
				name: body.nombre,
				last_name: body.apellido,
				email: body.correo,
				cellphone: body.celular,
				ci_number: body.ci,
				picture_image: body.image_path,
				date_birth: body.fecha_nac,
				
			};

			const usuario = await user.findOne({
				where: {
					id: student.id_user,
				},
			});

			if (!usuario) return NotFoundResponse(`User associated with student id: ${id} does not exist.`);

			await user.update(userDataToUpdate, {
				where: {
					id: student.id_user,
				},
			});

			return Successful('Record updated', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	
	async delete(id) {
		try {
			// Buscar el estudiante por su ID
			const estudiante = await estudiantes.findOne({
				where: {
					id: id,
				},
			});

			// Verificar si el estudiante existe
			if (!estudiante) {
				return NotFoundResponse(`El estudiante con el ID: ${id} no existe.`);
			}

			// Eliminar el estudiante de la tabla de estudiantes
			await estudiantes.destroy({
				where: {
					id: id,
				},
			});

			// Buscar al usuario asociado al estudiante
			const usuario = await user.findOne({
				where: {
					id: estudiante.id_user,
				},
			});

			// Verificar si el usuario existe
			if (!usuario) {
				return NotFoundResponse(`El usuario asociado al estudiante con el ID: ${id} no existe.`);
			}

			// Eliminar al usuario de la tabla de usuarios
			await user.destroy({
				where: {
					id: usuario.id,
				},
			});

			return Successful('Registro eliminado correctamente.', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
