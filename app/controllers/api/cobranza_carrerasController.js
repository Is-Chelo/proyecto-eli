const cobranza_carreraService = require('../../services/cobranza_carrerasService');

module.exports = {
	async index(req, res) {
		const response = await cobranza_carreraService.index(req.query);
		res.status(200).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await cobranza_carreraService.show(id);
		res.status(200).json(response);
	},
	async create(req, res) {
		const {body} = req;

		const response = await cobranza_carreraService.create(body);
		res.status(200).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await cobranza_carreraService.update(id, body);
		res.status(200).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await cobranza_carreraService.delete(id);
		res.status(200).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/tipo_cursos');
	// },
};
