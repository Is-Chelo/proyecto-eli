const asistenciasCarrerasService = require('../../services/asistenciasCarrerasService');

module.exports = {
	async index(req, res) {
		const response = await asistenciasCarrerasService.index(req.query);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await asistenciasCarrerasService.show(id, req.query);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await asistenciasCarrerasService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await asistenciasCarrerasService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await asistenciasCarrerasService.delete( id );
		res.status(response.statusCode).json(response);
	},
	async getAsistencia(req, res) {
		const { id_registro } = req.params
		const { fecha, id_asignatura} = req.query; 
		const response = await asistenciasCarrerasService.getAsistencia( id_registro, id_asignatura,fecha );
		res.status(response.statusCode).json(response);
	},

	// * VIEWS
	// async listView(req, res) {
	// 	res.render('home/asistencias');
	// },
};
