const colorService = require('../../services/ColorService');

module.exports = {
	async index(req, res) {
		const response = await colorService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await colorService.show(id, req.query);
		res.status(response.statusCode).json(response);
	},
	async getModulos(req, res) {
		const { color, fechaInicio, fechaFin } = req.query; 
		const response = await colorService.getModulos( color, fechaInicio, fechaFin );
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await colorService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await colorService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await colorService.delete( id );
		res.status(response.statusCode).json(response);
	},
	

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/asistencias');
	// },
};
