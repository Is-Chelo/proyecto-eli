const programacionesService = require('../../services/programacionesService');

module.exports = {
	async index(req, res) {
		const response = await programacionesService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await programacionesService.show(id);
		res.status(response.statusCode).json(response);
	},

	async create(req, res) {
		const {body} = req;
		const response = await programacionesService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await programacionesService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await programacionesService.delete(id);
		res.status(response.statusCode).json(response);
	},

	async getProgramacionbyCursos(req, res) {
		const {id_curso} = req.params;
		const response = await programacionesService.getProgramacionbyCursos(id_curso);
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/programaciones');
	// },
};
