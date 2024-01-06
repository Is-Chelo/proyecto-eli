const asignaturasService = require('../../services/asignaturasService');

module.exports = {
	async index(req, res) {
		const response = await asignaturasService.index(req.query);
		res.status(200).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await asignaturasService.show(id);
		res.status(200).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await asignaturasService.create(body);
		res.status(200).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await asignaturasService.update(id, body);
		res.status(200).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await asignaturasService.delete(id);
		res.status(200).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/asignaturas');
	// },
};
