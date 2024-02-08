const notas_carrerasService = require('../../services/notas_carrerasService');

module.exports = {
	async index(req, res) {
		const response = await notas_carrerasService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id_registro_carrera } = req.params;
		const { id_asignatura, casilla } = req.query;
		const response = await notas_carrerasService.show(id_registro_carrera, id_asignatura,casilla);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await notas_carrerasService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await notas_carrerasService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await notas_carrerasService.delete( id );
		res.status(response.statusCode).json(response);
	},

	// async getNotasModulo(req, res) {
	// 	// const { id } = req.params
	// 	const { id_registro_carrera, id_modulo } = req.params;
	// 	const response = await notas_carrerasService.getNotasModulo(id_registro_carrera, id_modulo);
	// 	res.status(response.statusCode).json(response);
	// },

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/notas');
	// },
};
