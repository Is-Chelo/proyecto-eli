const programacionModulosService = require('../../services/programacionModulosService');

module.exports = {
	async index(req, res) {
		const response = await programacionModulosService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await programacionModulosService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await programacionModulosService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await programacionModulosService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await programacionModulosService.delete( id );
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/aulas');
	// },
};
