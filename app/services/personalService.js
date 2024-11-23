const {personal, user, sequelize} = require('../models/index');
const Filter = require('../utils/filter');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');
const AuthServices = require('./AuthServices');

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
				id_sucursal,
				genero
			} = body;
			if (
				id_rol == undefined ||
				apellido_paterno == undefined ||
				apellido_materno == undefined ||
				nombres == undefined ||
				ci == undefined 
			
			) {
				return BadRequest('Bad request. Please fill all field', []);
			}
			
			const dataForUser = {
				name: nombres,
				last_name: `${apellido_paterno} ${apellido_materno}`,
				email: correo_electronico,
				cellphone: telefono,
				ci_number: ci,
				picture_image: null,
				username: ci,
				password: ci,
				active: true,
				date_birth: fecha_de_nacimiento,
				id_rol,
				id_sucursal,
			};

			const userCreated = await AuthServices.createUser(dataForUser);
			
			if (userCreated.status) {
				const personalData = {
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
					pago_por_hora: pago_por_hora == '' ? null : pago_por_hora,
					fecha_de_nacimiento,
					profesion,
					universidad,
					id_user: userCreated.data.dataValues.id,
					id_sucursal,
					genero
				};
				const response = await personal.create(personalData);
				return Successful('Personal type added', []);
			} else {
				return userCreated;
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
			// res.status(500);
			// res.send(error.message);
		}
	},

	async index(params = []) {
		try {
			let response = await personal.findAll({});

			if (Object.keys(params).length > 0) {
				response = await Filter.applyFilter(params, personal);
			}

			return Successful('Operacion Exitosa', response.map(item=>item.fromDataModel()));
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
			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
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
				genero
			} = body;
			if (
				id == undefined ||
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
			const responsePersonal = await personal.findOne({
				where: {id: id},
			});

			if (!responsePersonal)
				return NotFoundResponse(`La personal con el id: ${id} que solicitas no existe `);

			const personalData = {
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
				genero,
				universidad,
			};

			const dataForUser = {
				name: nombres,
				last_name: `${apellido_paterno} ${apellido_materno}`,
				email: correo_electronico,
				cellphone: telefono,
				ci_number: ci,
				picture_image: null,
				username: ci,
				active: true,
				date_birth: fecha_de_nacimiento,
				id_rol,
			};

			AuthServices.update(responsePersonal.id_user, dataForUser);

			await personal.update(personalData, {
				where: {
					id: id,
				},
			});

			return Successful('Personal type added', []);
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

			await user.destroy({
				where: {id: response.id_user},
			});

			await personal.destroy({
				where: {id: id},
			});

			return Successful('Registro eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async login(req, res) {
		try {
			const {usuario, pass} = req.body;
			// TODO: verificar si el usuario existe
			const user = await this.findByUserNameOrEmail(usuario);
			if (!user) return NotFoundResponse('Usuario no encontrado');

			// TODO sacamos el rol para ver si tiene un rol asignado
			if (user.id_rol === null) {
				return BadRequest('El usuario no tiene un rol Asignado');
			}

			// TODO comparar contraseñas
			// const compararClaves = await bcrypt.compare(pass, user.pass);
			// TODO generar el jwt con los datos del usuario  si compararClaves es true
			if (pass == user.pass) {
				tokenUser = jwt.sign(
					{
						id: user.id,
						name: user.name,
						email: user.email,
						rol: user.id_rol,
					},
					process.env.SECRET_KEY,
					{
						expiresIn: '4h',
					}
				);
				return {
					status: true,
					statusCode: 200,
					message: ['Login exitoso.'],
					data: {
						token: tokenUser,
						id: user.id,
						name: user.name,
						email: user.email,
						rol: user.id_rol,
						// menu: dataTransform,
					},
				};
			} else {
				return NotFoundResponse('La contraseña no coincide...');
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async findByUserNameOrEmail(usuario = '') {
		const userExits = await personal.findOne({
			where: {[Op.or]: [{usuario}]},
		});

		if (!userExits) return false;

		return userExits;
	},
};
