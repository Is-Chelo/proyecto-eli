'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class registros_carreras extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.estudiantes, {
				foreignKey: 'id_estudiante',
			});
			this.belongsTo(models.carreras, {
				foreignKey: 'id_curso',
			});
			this.belongsTo(models.personal, {
				foreignKey: 'id_personal',
			});
			this.hasMany(models.notas_carreras, {
				foreignKey: 'id_registro_carrera',
			});
			this.hasMany(models.asistencias_carreras, {
				foreignKey: 'id_registro_carrera',
			});
		}
		fromDataModel() {
			// Calcular notas específicas
			const notas = this.notas_carreras || [];
			const nota_Asistencia = notas.find(n => n.casilla === "Asistencia")?.nota || 0;
			const id_Asistencia = notas.find(n => n.casilla === "Asistencia")?.id || null;
			
			const nota_Puntualidad = notas.find(n => n.casilla === "Puntualidad")?.nota || 0;
			const id_Puntualidad = notas.find(n => n.casilla === "Puntualidad")?.id || null;
			
			const nota_PrimerParcial = notas.find(n => n.casilla === "Primer Parcial")?.nota || 0;
			const id_PrimerParcial = notas.find(n => n.casilla === "Primer Parcial")?.id || null;
			
			const nota_SegundoParcial = notas.find(n => n.casilla === "Segundo Parcial")?.nota || 0;
			const id_SegundoParcial = notas.find(n => n.casilla === "Segundo Parcial")?.id || null;
			
			const nota_TercerParcial = notas.find(n => n.casilla === "Tercer Parcial")?.nota || 0;
			const id_TercerParcial = notas.find(n => n.casilla === "Tercer Parcial")?.id || null;
			
			const nota_TP = notas.find(n => n.casilla === "Trabajos Practicos")?.nota || 0;
			const id_TP = notas.find(n => n.casilla === "Trabajos Practicos")?.id || null;
			
			const SegundaInstancia = notas.find(n => n.casilla === "Segunda Instancia")?.nota || 0;
			const id_SegundaInstancia = notas.find(n => n.casilla === "Segunda Instancia")?.id || null;
			
			const nota_examenFinal = notas.find(n => n.casilla === "Examen Final")?.nota || 0;
			const id_examenFinal = notas.find(n => n.casilla === "Examen Final")?.id || null;
			
			// Calcular los totales y porcentajes
			const totalAsistenciaPuntualidad = (((nota_Asistencia + nota_Puntualidad) / 2) * 0.1).toFixed(2);
			const totalSaber = (((nota_PrimerParcial + nota_SegundoParcial + nota_TercerParcial + nota_TP) / 4) * 0.6).toFixed(2);
			const totalDecidir = (nota_examenFinal * 0.3).toFixed(2);
			const notaPremilinar = (parseFloat(totalAsistenciaPuntualidad) + parseFloat(totalSaber)).toFixed(2);
			const notaFinal = (parseFloat(totalDecidir)+parseFloat(notaPremilinar)).toFixed(2);
			const estado = parseFloat(notaFinal) > 61 ? "Aprobado" : (
				SegundaInstancia && parseFloat(SegundaInstancia) > 61 ? "Aprobado en Segunda Instancia" : "Reprobado"
			);
		
			return {
				id_carrera: this.carrera?.id,
				carrera_nombre: this.carrera?.nombre,
				id: this.id,
				id_personal: this.id_personal,
				id_estudiante: this.id_estudiante,
				id_curso: this.id_curso,
				anio: this.anio,
				estado: this.estado,
				condicion: this.condicion,
				fecha_registro: this.fecha_registro,
				fecha_programacion: this.fecha_programacion,
				id_promocion: this.promocion?.id,
				condicioninicial: this.condicioninicial,
				comentario_registro: this.comentario_registro,
				comentario_programacion: this.comentario_programacion,
				id_sucursal: this.id_sucursal,
				certificado: this.certificado,
				id_personal: this.personal?.id,
				asesor: `${this.personal ? `${this.personal?.apellido_paterno} ${this.personal?.apellido_materno} ${this.personal?.nombres}` : 'Sin Asesor'}`,
				id_estudiante: this.estudiante?.id,
				estudiante: `${this.estudiante?.apellido} ${this.estudiante?.nombre}`,
				celular: this.estudiante?.celular,
				correo: this.estudiante?.correo,
				ci: this.estudiante?.ci,
				genero: this.estudiante?.genero,
				fecha_nac: this.estudiante?.fecha_nac,
				id_asignaturas: this.id_asignaturas,
				modalidad: this.modalidad,
				fecha_inicio: this.curso?.fecha_inicio,
				fecha_fin: this.curso?.fecha_fin,
				hora_inicio: this.curso?.hora_inicio,
				cantidad_horas: this.curso?.cantidad_horas,
				dias: this.curso?.dias,
				aula: this.curso?.aula?.nombre,
				asistencias: this.asistencias_carreras,
				notas: this.notas,
				moodle: this.moodle,
				nota_Asistencia: nota_Asistencia,
				id_Asistencia: id_Asistencia,
				nota_Puntualidad: nota_Puntualidad,
				id_Puntualidad: id_Puntualidad,
				TotalSer: totalAsistenciaPuntualidad,
				nota_PrimerParcial: nota_PrimerParcial,
				id_PrimerParcial: id_PrimerParcial,
				nota_SegundoParcial: nota_SegundoParcial,
				id_SegundoParcial: id_SegundoParcial,
				nota_TercerParcial: nota_TercerParcial,
				id_TercerParcial: id_TercerParcial,
				nota_TP: nota_TP,
				id_TP: id_TP,
				TotalSaber: totalSaber,
				notaPremilinar: notaPremilinar,
				nota_examenFinal: nota_examenFinal,
				id_examenFinal: id_examenFinal,
				nota_totalDecidir: totalDecidir,
				notaFinal: notaFinal,
				nota_SegundaInstancia: SegundaInstancia,
				id_SegundaInstancia: id_SegundaInstancia,
				estadoAprobacion: estado
			};
		}
		

		// fromDataModel() {
		// 	return {
		// 		id_carrera: this.carrera?.id,
		// 		carrera_nombre:  this.carrera?.nombre,
		// 		id: this.id,
		// 		id_personal: this.id_personal,
		// 		id_estudiante: this.id_estudiante,
		// 		id_curso: this.id_curso,
		// 		anio: this.anio,
		// 		estado:this.estado,
		// 		condicion: this.condicion,
		// 		fecha_registro: this.fecha_registro,
		// 		fecha_programacion: this.fecha_programacion,
		// 		id_promocion: this.promocion?.id,
		// 		condicioninicial: this.condicioninicial,
		// 		comentario_registro: this.comentario_registro,
		// 		comentario_programacion	: this.comentario_programacion,
		// 		id_sucursal: this.id_sucursal,
		// 		certificado:this.certificado,
		// 		id_personal: this.personal?.id,
		// 		asesor: `${this.personal?`${this.personal?.apellido_paterno} ${this.personal?.apellido_materno} ${this.personal?.nombres}`:'Sin Asesor'}`,
		// 		id_estudiante: this.estudiante?.id,
		// 		estudiante: `${this.estudiante?.apellido} ${this.estudiante?.nombre} `,
		// 		celular: this.estudiante?.celular,
		// 		correo: this.estudiante?.correo,
		// 		ci: this.estudiante?.ci,
		// 		genero: this.estudiante?.genero,
		// 		fecha_nac: this.estudiante?.fecha_nac,
		// 		id_asignaturas: this.id_asignaturas,
		// 		modalidad:  this.modalidad,
		// 		fecha_inicio: this.curso?.fecha_inicio,
		// 		fecha_fin: this.curso?.fecha_fin,
		// 		hora_inicio: this.curso?.hora_inicio,
		// 		cantidad_horas: this.curso?.cantidad_horas,
		// 		dias: this.curso?.dias,
		// 		aula: this.curso?.aula?.nombre,
		// 		asistencias:this.asistencias,
		// 		notas:this.notas,
		// 		moodle:this.moodle,
		// 		nota_Asistencia
		// 		nota_Puntualidad
		// 		TotalSer
		// 		nota_PrimerParcial
		// 		nota_SegundoParcial
		// 		nota_TercerParcial
		// 		nota_TP
		// 		TotalSaber
		// 		nota_examenFinal
		// 		nota_totalDecidir
		// 		totalDecidir
		// 		nota_Segunda


		// 	};
		// }
	}
	registros_carreras.init(
		{
			id_personal: DataTypes.INTEGER,
			id_estudiante: DataTypes.INTEGER,
			id_curso: DataTypes.INTEGER,
			anio: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
			condicion: DataTypes.STRING,
			fecha_registro: DataTypes.DATE,
			fecha_programacion: DataTypes.DATE,
			comentario: DataTypes.STRING,
			modalidad: DataTypes.STRING,
			id_promocion: DataTypes.INTEGER,
			id_asignaturas: DataTypes.STRING,
			condicioninicial: DataTypes.STRING,
			comentario_registro: DataTypes.STRING,
			comentario_programacion: DataTypes.STRING,
			id_sucursal: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'registros_carreras',
		}
	);
	return registros_carreras;
};
