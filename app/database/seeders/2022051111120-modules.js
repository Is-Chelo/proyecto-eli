'use strict';
// const { rolesModulo } = require("../../models/index");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('modules', modules);
		await queryInterface.bulkInsert('aulas', aulas);
		await queryInterface.bulkInsert('asignaturas', asignaturas);
		await queryInterface.bulkInsert('modulos', modulos);
		await queryInterface.bulkInsert('carreras', carreras);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('modules', null, {});
		await queryInterface.bulkDelete('aulas', null, {});
		await queryInterface.bulkDelete('asignaturas', null, {});
		await queryInterface.bulkDelete('modulos', null, {});
		await queryInterface.bulkDelete('carreras', null, {});
	},
};

const modulos = [
	{nombre: 'WINDOWS', estado: true},
	{nombre: 'WORD', estado: true},
	{nombre: 'POWER POINT', estado: true},
	{nombre: 'PUBLISHER', estado: true},
	{nombre: 'ACCESS', estado: true},
	{nombre: 'PHOTOSHOP', estado: true},
	{nombre: 'ILUSTRATOR', estado: true},
	{nombre: 'INDESING', estado: true},
	{nombre: 'MATEMATICA FINANCIERA', estado: true},
	{nombre: 'CONTABILIDAD I', estado: true},
	{nombre: 'LEG. LABORAL', estado: true},
	{nombre: 'INFO. CONTABLE', estado: true},
	{nombre: 'SIST. TRIBURARIO', estado: true},
	{nombre: 'ADMINISTRACION GENERAL', estado: true},
	{nombre: 'CONTABILIDAD', estado: true},
	{nombre: 'ESTADISTICA', estado: true},
	{nombre: 'FUNDAMENTOS DE LA ADMINISTRACION', estado: true},
	{nombre: 'GESTOR EMPRESARIAL', estado: true},
	{nombre: 'INFORMATICA APLICADA', estado: true},
	{nombre: 'LEGISLACION LABORAL', estado: true},
	{nombre: 'LEGISLACION LABORAL, SEGURIDAD..', estado: true},
	{nombre: 'MATEMATICA FINANCIERA', estado: true},
	{nombre: 'ADMINISTRACION DE COSTOS Y PRESUPUESTO', estado: true},
	{nombre: 'ADMINISTRACION DE LA PRODUCCION', estado: true},
	{nombre: 'ADMINISTRACION DEL TALENTO HUMANO', estado: true},
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
const carreras = [
	{nombre: 'Administración Financiera', duracion: 3},
	{nombre: 'Secretariado Ejecutivo', duracion: 3},
	{nombre: 'Contaduría Pública', duracion: 3},
	{nombre: 'Sistemas Informáticos', duracion: 3},
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
