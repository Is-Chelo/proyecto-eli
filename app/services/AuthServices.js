const {user, module: modulo, rol_module, role} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const {NotFoundResponse, BadRequest, InternalServer} = require('../utils/response');
const moment = require('moment');

// const {menuTransform} = require('./utils/menu-transform');
// const {usersTransform} = require('./utils/user-transform');
// const {usersTransformReport} = require('./utils/reports/user-transform-report');

// const sendEmail = require('./SendEmailService');
module.exports = {
	// async register(body) {
	// 	const {password, email, username} = body;
	// 	try {
	// 		if (this.validateDateBirth(body.date_birth))
	// 			return BadRequest(
	// 				'No puede registrar la fecha de nacimiento, el mismo dia que hoy o superior.'
	// 			);
	// 		// TODO: verificamos que no exista un usuario con ese email
	// 		const usuarioExiste = await this.findByUserNameOrEmail(username, email);

	// 		if (usuarioExiste) {
	// 			return BadRequest('Usuario con ese email o username ya esta registrado.');
	// 		}

	// 		// TODO: haseamos clave
	// 		const claveNueva = await bcrypt.hash(password, 10);
	// 		// TODO: Creamos usuario
	// 		const userNew = await user.create({
	// 			name: body.name,
	// 			last_name: body.last_name,
	// 			date_birth: body.date_birth,
	// 			address: body.address,
	// 			cellphone: body.cellphone,
	// 			username: body.username,
	// 			ci_expedition: body.ci_expedition,
	// 			ci_number: body.ci_number,
	// 			password: claveNueva,
	// 			active: true,
	// 			id_rol: body.rol !== null || body.rol !== undefined ? body.rol : 1,
	// 			email,
	// 		});
	// 		return {
	// 			status: true,
	// 			statusCode: 201,
	// 			message: ['Registro exitoso'],
	// 			data: {
	// 				id: userNew.id,
	// 				name: userNew.name,
	// 				email: userNew.email,
	// 				rol: userNew.id_rol,
	// 			},
	// 		};
	// 	} catch (error) {
	// 		console.log(error);
	// 		if (error.parent?.errno === 1062) {
	// 			const regex = /'([^']*)'/; // Expresión regular para extraer la subcadena entre comillas simples
	// 			const resultado = error.parent.sqlMessage.match(regex)[1];
	// 			return BadRequest(`Ya exite un documento de identidad con el nro ${resultado}`);
	// 		}
	// 		return InternalServer('Error en el servidor');
	// 	}
	// },

	async login(req, res) {
		try {
			const {email, username, password} = req.body;
			// TODO: verificar si el usuario existe
			const user = await this.findByUserNameOrEmail(username, email);
			if (!user) return NotFoundResponse('Usuario no encontrado');

			// TODO sacamos el rol para ver si tiene un rol asignado
			if (user.id_rol === null) {
				return BadRequest('El usuario no tiene un rol Asignado');
			}

			// const menu = await rol_module.findAll({
			// 	where: {
			// 		id_rol: user.id_rol,
			// 	},
			// 	include: [
			// 		{
			// 			model: modulo,
			// 			where: {
			// 				url: {
			// 					[Op.not]: '/api/v1/role-module',
			// 				},
			// 			},
			// 		},
			// 	],
			// });

			// const dataTransform = Object.values(menu).map((data) => {
			// 	return menuTransform(data.dataValues);
			// });

			// TODO comparar contraseñas
			const compararClaves = await bcrypt.compare(password, user.password);
			// TODO generar el jwt con los datos del usuario  si compararClaves es true
			if (compararClaves) {
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

	async update(id, body) {
		const {password, email, username, ...res} = body;

		try {
			if (this.validateDateBirth(body.date_birth))
				return BadRequest(
					'No puede registrar la fecha de nacimiento, el mismo dia que hoy o superior.'
				);
			// TODO: verificamos que no exista un usuario con ese email
			const usuarioExiste = await this.findByUserNameOrEmail(username, email);

			if (usuarioExiste)
				if (Number(usuarioExiste.dataValues.id) !== Number(id)) {
					return BadRequest('Usuario con ese email o username ya esta registrado.');
				}
			let passwordNew;
			if (password === '' || password === null || password === undefined) {
				passwordNew = usuarioExiste.password;
			} else {
				passwordNew = await bcrypt.hash(password, 10);
			}

			const response = await user.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Persona con el id: ${id} no existe.`);
			}

			await user.update(
				{
					...res,
					email,
					username,
					password: passwordNew,
				},
				{
					where: {
						id: id,
					},
				}
			);

			return {
				status: true,
				statusCode: 200,
				message: ['Registro actualizado.'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async findByUserNameOrEmail(username = '', email = '') {
		const userExits = await user.findOne({
			where: {[Op.or]: [{username}, {email}]},
		});

		if (!userExits) return false;

		return userExits;
	},

	validateDateBirth(datePerson) {
		const dateNow = moment().format('YYYY-MM-DD');
		const personDate = datePerson;
		if (personDate >= dateNow) return true;
		return false;
	},

	// * funcion para eliminar un item
	async delete(id) {
		try {
			const response = await user.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`El usuario con el id: ${id} que solicitas no existe `);
			}
			await user.destroy({
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['El Registro se eliminó'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async sendEmail(email) {
		const user = await user.findOne({
			where: {email},
		});
		if (!user) {
			return NotFoundResponse(`Usuario con el email: ${email} no existe. `);
		}

		const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
			expiresIn: '1h',
		});

		await user.update({
			token_reset_clave: token,
		});

		const responseSend = await sendEmail.sendMail(token, user);
		return responseSend;
	},

	async resetPassword(body) {
		const {password, id, token} = body;
		console.log('TOKEN: ', token);
		try {
			const user = await user.findOne({
				where: {
					id,
					token_reset_clave: token,
				},
			});
			console.log(user);
			if (!user) {
				return NotFoundResponse(`Usuario con el token no existe. `);
			}
			// TODO: Verificamos que el token no haya expirado
			const userToken = await jwt.verify(
				user.token_reset_clave,
				process.env.SECRET_KEY,
				async (err, payload) => {
					if (err) {
						console.log(err);
						await user.update({
							token_reset_clave: null,
						});
						return res
							.status(400)
							.json({message: 'El token expiro intente nuevamente'});
					}
				}
			);
			console.log('userToken', userToken);
			// TODO: haseamos clave
			const claveNueva = await bcrypt.hash(password, 10);
			// TODO: actualizar la clave
			await user.update({
				password: claveNueva,
				token_reset_clave: null,
			});

			return {
				status: true,
				statusCode: 201,
				message: ['La contraseña se actualizo con exito.'],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
