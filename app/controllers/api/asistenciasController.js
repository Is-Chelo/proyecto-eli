const asistenciasService = require('../../services/asistenciasService');

module.exports = {
	async index(req, res) {
		const response = await asistenciasService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await asistenciasService.show(id, req.query);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await asistenciasService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await asistenciasService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await asistenciasService.delete( id );
		res.status(response.statusCode).json(response);
	},
	async getAsistencia(req, res) {
		const { id_registro } = req.params
		const { fecha } = req.query; 
		const response = await asistenciasService.getAsistencia( id_registro, fecha );
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/asistencias');
	// },
};
