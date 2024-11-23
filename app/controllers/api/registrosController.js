const registrosService = require('../../services/registrosService');

module.exports = {
	async index(req, res) {
		const response = await registrosService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	
	async getList(req, res) {
		const response = await registrosService.getList(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await registrosService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await registrosService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await registrosService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await registrosService.delete( id );
		res.status(response.statusCode).json(response);
	},

	async getData(req, res) {
		const response = await registrosService.getData(req.query );
		res.status(response.statusCode).json(response);
	},
	async getDataBar(req, res) {
		const response = await registrosService.getDataByMonth(req.query );
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/registros');
	// },
};
