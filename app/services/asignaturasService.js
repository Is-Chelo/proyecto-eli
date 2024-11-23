const {
	asignaturas,
	plan_estudios,
	carreras,
	modulos,
	personal,
	aulas,
	sequelize,
	tipo_cursos,
} = require('../models/index');
const {InternalServer, NotFoundResponse, Successful} = require('../utils/response');

module.exports = {
	async create(body) {
		try {
			const response = await asignaturas.create({...body});

			return Successful('Item Registrado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async index(params = {}) {
		try {
			const { anio, id_carrera, turno, modalidad, id_sucursal, id_personal } = params;
	
			let whereClause = {};
			if (id_sucursal) whereClause.id_sucursal = id_sucursal;
			if (anio) whereClause.anio = anio;
			if (id_carrera) whereClause.id_carrera = id_carrera;
			if (turno) whereClause.turno = turno;
			if (modalidad) whereClause.modalidad = modalidad;
			if (id_personal) whereClause.id_personal = id_personal;
	
			// Obtener asignaturas con Sequelize y aplicar los filtros
			const response = await asignaturas.findAll({
				where: whereClause,
				include: [
					{ model: modulos },
					{ model: carreras },
					{ model: aulas },
					{ model: personal },
				],
				order: [['createdAt', 'DESC']]
			});
	
			return Successful('Operación Exitosa', response.map(item=> item.fromDataModel()));
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async show(id) {
		try {
			const response = await asignaturas.findOne({
				where: {
					id: id,
				},
				include: [
					{ model: aulas },
					{ model: modulos },
					{ model: personal },
				],
			});

			if (!response) return NotFoundResponse(`cursos con el id: ${id} no existe. `);
			return Successful('Operacion Exitosa', response.fromDataModel());
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},


	async update(id, body) {
		try {
			const response = await asignaturas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) return NotFoundResponse(`asignaturas con el id: ${id} no existe.`);

			await asignaturas.update(body, {
				where: {
					id: id,
				},
			});

			return Successful('Registro actualizado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para eliminar un item
	async delete(id) {
		try {
			const response = await asignaturas.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La asignaturas con el id: ${id} que solicitas no existe `);
			}

			await asignaturas.destroy({
				where: {id: id},
			});
			return Successful('Registro eliminado', response);
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
