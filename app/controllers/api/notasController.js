const notasService = require('../../services/notasService');

module.exports = {
	async index(req, res) {
		const response = await notasService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id_registro } = req.params
		const response = await notasService.show(id_registro);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await notasService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await notasService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await notasService.delete( id );
		res.status(response.statusCode).json(response);
	},

	async getNotasModulo(req, res) {
		// const { id } = req.params
		const { id_registro, id_modulo } = req.params;
		const response = await notasService.getNotasModulo(id_registro, id_modulo);
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/notas');
	// },
};
