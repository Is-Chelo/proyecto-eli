const tipo_cursosService = require('../../services/tipo_cursosService');

module.exports = {
	async index(req, res) {
		const response = await tipo_cursosService.index(req.query);
		res.status(200).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await tipo_cursosService.show(id);
		res.status(200).json(response);
	},
	async create(req, res) {
		const {body} = req;
		
		const response = await tipo_cursosService.create(body);
		res.status(200).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await tipo_cursosService.update(id, body);
		res.status(200).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await tipo_cursosService.delete(id);
		res.status(200).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/tipo_cursos');
	// },
};
