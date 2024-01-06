'use strict';
// const { rolesModulo } = require("../../models/index");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('modules', modules);
		await queryInterface.bulkInsert('aulas', aulas);
		await queryInterface.bulkInsert('asignaturas', asignaturas);
		await queryInterface.bulkInsert('modulos', modulos);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('modules', null, {});
		await queryInterface.bulkDelete('aulas', null, {});
		await queryInterface.bulkDelete('asignaturas', null, {});
		await queryInterface.bulkDelete('modulos', null, {});
	},
};

const modulos = [
	{name: 'WINDOWS', active: true},
	{name: 'WORD', active: true},
	{name: 'POWER POINT', active: true},
	{name: 'PUBLISHER', active: true},
	{name: 'ACCESS', active: true},
	{name: 'PHOTOSHOP', active: true},
	{name: 'ILUSTRATOR', active: true},
	{name: 'INDESING', active: true},
	{name: 'MATEMATICA FINANCIERA', active: true},
	{name: 'CONTABILIDAD I', active: true},
	{name: 'LEG. LABORAL', active: true},
	{name: 'INFO. CONTABLE', active: true},
	{name: 'SIST. TRIBURARIO', active: true},
	{name: 'ADMINISTRACION GENERAL', active: true},
	{name: 'CONTABILIDAD', active: true},
	{name: 'ESTADISTICA', active: true},
	{name: 'FUNDAMENTOS DE LA ADMINISTRACION', active: true},
	{name: 'GESTOR EMPRESARIAL', active: true},
	{name: 'INFORMATICA APLICADA', active: true},
	{name: 'LEGISLACION LABORAL', active: true},
	{name: 'LEGISLACION LABORAL, SEGURIDAD..', active: true},
	{name: 'MATEMATICA FINANCIERA', active: true},
	{name: 'ADMINISTRACION DE COSTOS Y PRESUPUESTO', active: true},
	{name: 'ADMINISTRACION DE LA PRODUCCION', active: true},
	{name: 'ADMINISTRACION DEL TALENTO HUMANO', active: true},
];
const asignaturas = [
	{
		id_carrera: 3,
		id_modulo: 15,
		fecha_inicio: '2023-12-30',
		fecha_fin: '2024-03-29',
		id_personal: 2,
		hora_inicio: '08:00',
		dias: '[{"name":"Jueves","code":"Jue"},{"name":"Miércoles","code":"Mier"}]',
		encargado: 4,
		modalidad: 'Presencial',
		cantidad_horas: 0.0,
		id_aula: 1,
		anio: 1,
	},
];

const aulas = [
	{nombre: 'Laboratorio 1', capacidad: 12, estado: true},
	{nombre: 'Laboratorio 2', capacidad: 12, estado: true},
	{nombre: 'Laboratorio 3', capacidad: 12, estado: true},
];

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
