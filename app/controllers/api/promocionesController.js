const promocionesService = require('../../services/promocionesService');

module.exports = {
	async index(req, res) {
		const response = await promocionesService.index(req.query);
		res.status(200).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await promocionesService.show(id);
		res.status(200).json(response);
	},
	async create(req, res) {
		const {body} = req;
		
		const response = await promocionesService.create(body);
		res.status(200).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await promocionesService.update(id, body);
		res.status(200).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await promocionesService.delete(id);
		res.status(200).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/tipo_cursos');
	// },
};
