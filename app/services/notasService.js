const {notas, modulos, registros, sequelize} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await notas.create(body);
			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(params = []) {
		try {
			const response = await notas.findAll({
				include: [{model: modulos}, {model: registros}],
			});

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id_registro) {
		try {
			const response = await notas.findOne({
				where: {
					id_registro: id_registro,
				},
				// include: [{model: modulos}, {model: registros}],
			});

			if (!response) return NotFoundResponse(`notas con el id: ${id_registro} no existe. `);

			return Successful('Operacion Exitosa', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await notas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`notas con el id: ${id} no existe.`);
			}

			await notas.update(body, {
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
			const response = await notas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La notas con el id: ${id} que solicitas no existe `);
			}

			await notas.destroy({
				where: {id: id},
			});
			return Successful('Registro Eliminado', []);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async getNotasModulo(id_registro, id_modulo) {
		try {
		  let notasQuery = 'SELECT * FROM notas WHERE 1=1';
	  
		  if (id_registro) {
			notasQuery += ` AND id_registro = ${id_registro}`;
		  }
	  
		  if (id_modulo!==undefined) {
			notasQuery += ` AND id_modulo = ${id_modulo}`;
		  }
		  console.log('notasQuery',notasQuery);
	  
		  const notasResult = await sequelize.query(notasQuery);
	  
		  console.log('notasResult', notasResult,'con',notasQuery);
		  return Successful('Datos', notasResult[0]);
		} catch (error) {
		  console.error(error);
		  return InternalServer('Error en el servidor');
		}
	  }
	  
};
