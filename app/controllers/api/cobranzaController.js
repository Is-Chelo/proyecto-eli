const cobranzaService = require('../../services/cobranzasService');

module.exports = {
	async index(req, res) {
		const response = await cobranzaService.index(req.query);
		res.status(200).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await cobranzaService.show(id);
		res.status(200).json(response);
	},
	async create(req, res) {
		const {body} = req;

		const response = await cobranzaService.create(body);
		res.status(200).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await cobranzaService.update(id, body);
		res.status(200).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await cobranzaService.delete(id);
		res.status(200).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/tipo_cursos');
	// },
};
