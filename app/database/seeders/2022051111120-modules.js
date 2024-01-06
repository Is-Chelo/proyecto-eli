'use strict';
// const { rolesModulo } = require("../../models/index");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('modules', modules);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('modules', null, {});
	},
};

const modules = [
	{
		name: 'Dashboard',
		url: '/api/v1/dashboard',
		icon: 'IconBrandReact',
		type: 'home',
		path_front: '/dashboard',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	// {
	//   name: "Modulo Jugador",
	//   url: "/api/v1/jugador",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Persona acargo",
	//   url: "/api/v1/personaCargo",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Planillero",
	//   url: "/api/v1/planillero",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Incripcion Jugador",
	//   url: "/api/v1/inscripcionJugador",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Arbitro Partido",
	//   url: "/api/v1/arbitroPartido",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Detalle Partido",
	//   url: "/api/v1/detallePartido",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Categoria",
	//   url: "/api/v1/categoria",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Equipo",
	//   url: "/api/v1/equipo",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Pago",
	//   url: "/api/v1/pago",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Motivo Pago",
	//   url: "/api/v1/motivoPago",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Inscripcion",
	//   url: "/api/v1/inscripcion",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Torneo",
	//   url: "/api/v1/torneo",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Campo Deportivo",
	//   url: "/api/v1/campoDeportivo",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Campo Juegos",
	//   url: "/api/v1/juegos",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
	// {
	//   name: "Modulo Observaciones",
	//   url: "/api/v1/observaciones",
	//   createdAt: new Date(),
	//   updatedAt: new Date(),
	// },
];
