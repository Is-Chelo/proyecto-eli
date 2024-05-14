const estudiantesService = require('../../services/estudiantesService');

module.exports = {
	async index(req, res) {
		const response = await estudiantesService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await estudiantesService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		console.log(body);
		const response = await estudiantesService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await estudiantesService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await estudiantesService.delete( id );
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/estudiantes');
	// },
};
