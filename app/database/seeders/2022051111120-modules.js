'use strict';
// const { rolesModulo } = require("../../models/index");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('modules', modules);
		await queryInterface.bulkInsert('aulas', aulas);
		await queryInterface.bulkInsert('asignaturas', asignaturas);
		await queryInterface.bulkInsert('asistencias', asitencias);
		await queryInterface.bulkInsert('modulos', modulos);
		await queryInterface.bulkInsert('carreras', carreras);
		await queryInterface.bulkInsert('cursos', cursos);
		await queryInterface.bulkInsert('personal', personal);
		await queryInterface.bulkInsert('roles', roles);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('modules', null, {});
		await queryInterface.bulkDelete('aulas', null, {});
		await queryInterface.bulkDelete('asignaturas', null, {});
		await queryInterface.bulkDelete('asitencias', null, {});
		await queryInterface.bulkDelete('modulos', null, {});
		await queryInterface.bulkDelete('carreras', null, {});
		await queryInterface.bulkDelete('cursos', null, {});
		await queryInterface.bulkDelete('personal', null, {});
		await queryInterface.bulkDelete('roles', null, {});
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
	{
		id_carrera: 3,
		id_modulo: 16,
		fecha_inicio: '2024-02-09',
		fecha_fin: '2024-12-13',
		id_personal: 1,
		hora_inicio: '08:00',
		dias: "[ {name: 'Jueves', code: 'Jue'},{name: 'Miércoles', code: 'Mier'},]",
		encargado: 6,
		modalidad: 'Presencial',
		cantidad_horas: 1.0,
		id_aula: 7,
		anio: 1,
	},
	{
		id_carrera: 3,
		id_modulo: 17,
		fecha_inicio: '2024-02-08',
		fecha_fin: '2024-12-13',
		id_personal: 4,
		hora_inicio: '08:00',
		dias: '[{"name":"Jueves","code":"Jue"},{"name":"Miércoles","code":"Mier"}]',
		encargado: 6,
		modalidad: 'Presencial',
		cantidad_horas: 1.0,
		id_aula: 2,
		anio: 1,
	},
	{
		id_carrera: 3,
		id_modulo: 17,
		fecha_inicio: '2024-02-08',
		fecha_fin: '2024-12-13',
		id_personal: 4,
		hora_inicio: '08:00',
		dias: '[{"name":"Jueves","code":"Jue"},{"name":"Miércoles","code":"Mier"}]',
		encargado: 6,
		modalidad: 'Presencial',
		cantidad_horas: 1.0,
		id_aula: 2,
		anio: 1,
	},
	{
		id_carrera: 3,
		id_modulo: 19,
		fecha_inicio: '2024-02-09',
		fecha_fin: '2024-12-13',
		id_personal: 4,
		hora_inicio: '08:00',
		dias: '[{"name":"Miércoles","code":"Mier"},{"name":"Jueves","code":"Jue"}]',
		encargado: 4,
		modalidad: 'Presencial',
		cantidad_horas: 2.0,
		id_aula: 2,
		anio: 1,
	},
	{
		id_carrera: 3,
		id_modulo: 19,
		fecha_inicio: '2024-02-09',
		fecha_fin: '2024-12-13',
		id_personal: 4,
		hora_inicio: '08:00',
		dias: '[{"name":"Miércoles","code":"Mier"},{"name":"Jueves","code":"Jue"}]',
		encargado: 4,
		modalidad: 'Presencial',
		cantidad_horas: 2.0,
		id_aula: 2,
		anio: 1,
	},

	{
		id_carrera: 3,
		id_modulo: 23,
		fecha_inicio: '2024-01-04',
		fecha_fin: '2023-12-15',
		id_personal: 0,
		hora_inicio: '08:00',
		dias: '[{"name":"Miércoles","code":"Mier"},{"name":"Jueves","code":"Jue"}]',
		encargado: 0,
		modalidad: 'Presencial',
		cantidad_horas: 1.0,
		id_aula: 0,
		anio: 2,
	},
];

const asitencias = [
	{id_registro: 1, fecha: '2023-11-14', asistencia: 'F', comentario: ''},
	{id_registro: 1, fecha: '2023-11-14', asistencia: 'L', comentario: ''},
	{id_registro: 1, fecha: '2023-11-14', asistencia: 'P', comentario: ''},
	{id_registro: 2, fecha: '2023-11-14', asistencia: 'L', comentario: ''},
	{id_registro: 2, fecha: '2023-11-14', asistencia: 'P', comentario: ''},
	{id_registro: 1, fecha: '2023-11-14', asistencia: 'P', comentario: ''},
	{id_registro: 1, fecha: '2023-11-14', asistencia: 'P', comentario: ''},
	{id_registro: 2, fecha: '2023-11-14', asistencia: 'L', comentario: ''},
];

const aulas = [
	{nombre: 'Laboratorio 1', capacidad: 12, estado: true},
	{nombre: 'Laboratorio 2', capacidad: 12, estado: true},
	{nombre: 'Laboratorio 3', capacidad: 12, estado: true},
	{nombre: 'Aula 1', capacidad: 12, estado: true},
	{nombre: 'Aula 2', capacidad: 12, estado: true},
];
const carreras = [
	{nombre: 'Administración Financiera', duracion: 3},
	{nombre: 'Secretariado Ejecutivo', duracion: 3},
	{nombre: 'Contaduría Pública', duracion: 3},
	{nombre: 'Sistemas Informáticos', duracion: 3},
];
const cursos = [
	{
		id: 13,
		nombre: 'Manejo de Paquetes G-1',
		nombre_corto: null,
		id_tipo_curso: 2,
		anio_turno: null,
		modalidad: '{"name":"Virtual","code":"Virtual"}',
		id_aula: 1,
		id_personal: 2,
		fecha_inicio: '2023-11-14',
		fecha_fin: '2023-11-22',
		hora_inicio: '08:30',
		cantidad_horas: 1.0,
		dias: '[{"name":"Lunes","code":"Lun"},{"name":"Martes","code":"Mar"},{"name":"Sábado","code":"Sab"}]',
		id_modulos:
			'{"id":[1,3,2],"format":[{"name":"WINDOWS","code":1},{"name":"POWER POINT","code":3},{"name":"WORD","code":2}]}',
		id_plan_estudio: 0,
	},
	{
		id: 15,
		nombre: 'Manejo de Paquetes G-2',
		nombre_corto: null,
		id_tipo_curso: 2,
		anio_turno: null,
		modalidad: '{"name":"Presencial","code":"Presencial"}',
		id_aula: 2,
		id_personal: 6,
		fecha_inicio: '2023-11-15',
		fecha_fin: '2023-11-25',
		hora_inicio: '09:00',
		cantidad_horas: 2.0,
		dias: '[{"name":"Lunes","code":"Lun"},{"name":"Miércoles","code":"Mier"},{"name":"Sábado","code":"Sab"}]',
		id_modulos:
			'{"id":[1,2,3],"format":[{"name":"WINDOWS","code":1},{"name":"WORD","code":2},{"name":"POWER POINT","code":3}]}',
		id_plan_estudio: 0,
	},

	{
		id: 16,
		nombre: 'Diseño Grafico',
		nombre_corto: null,
		id_tipo_curso: 3,
		anio_turno: null,
		modalidad: '{"name":"Presencial","code":"Presencial"}',
		id_aula: 2,
		id_personal: 6,
		fecha_inicio: '2023-11-13',
		fecha_fin: ' 2023-12-16',
		hora_inicio: '08:00',
		cantidad_horas: 2.0,
		dias: '[{"name":"Martes","code":"Mar"},{"name":"Jueves","code":"Jue"}]',
		id_modulos:
			'{"id":[6,7,8],"format":[{"name":"PHOTOSHOP","code":6},{"name":"ILUSTRATOR","code":7},{"name":"INDESING","code":8}]}',
		id_plan_estudio: 0,
	},
];

const personal = [
	{
		id: 1,
		id_rol: 1,
		apellido_paterno: 'Villarpando',
		apellido_materno: 'Valencia',
		nombres: 'Elizabeth',
		telefono: null,
		correo_electronico: 'evillarpando@cca.edu.bo',
		numero_de_cuenta: null,
		tipo_de_cuenta: null,
		banco: null,
		ci: '10381504Ch',
		carrera_o_curso: null,
		pago_por_hora: null,
		fecha_de_nacimiento: null,
		profesion: null,
		universidad: null,
	},
];

const roles = [
	{id: 1, name: 'Admin', active: true},
	{id: 2, name: 'Academico', active: true},
	{id: 3, name: 'Contador', active: true},
	{id: 4, name: 'Asesor', active: true},
	{id: 5, name: 'Docente', active: true},
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
