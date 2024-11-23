const registros_carrerasService = require('../../services/registros_carrerasService');

module.exports = {
	async index(req, res) {
		const response = await registros_carrerasService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async getList(req, res) {
		const response = await registros_carrerasService.getList(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await registros_carrerasService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await registros_carrerasService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await registros_carrerasService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await registros_carrerasService.delete(id);
		res.status(response.statusCode).json(response);
	},
	
	// async getRegistrosByCurso(req, res) {
	// 	const {id_curso} = req.params;
	// 	const response = await registros_carrerasService.getRegistrosByCurso(id_curso);
	// 	res.status(response.statusCode).json(response);
	// },

	// async getRegistros(req, res) {
	// 	const response = await registros_carrerasService.getRegistros(req.query);
	// 	res.status(response.statusCode).json(response);
	// },

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/registros-carreras');
	// },
};
