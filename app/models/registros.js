'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class registros extends Model {
		static associate(models) {
			this.belongsTo(models.estudiantes, {
				foreignKey: 'id_estudiante',
			});
			this.belongsTo(models.cursos, {
				foreignKey: 'id_curso',
			});
		
			this.hasMany(models.programaciones, {
				foreignKey: 'id_registro',
			});
			this.hasMany(models.notas, {
				foreignKey: 'id_registro',
			});
			this.hasMany(models.asistencias, {
				foreignKey: 'id_registro',
			});
			this.belongsTo(models.personal, {
				foreignKey: 'id_personal',
			});
			
			this.belongsTo(models.promociones, {
                foreignKey: 'id_promocion',
                as: 'promocion',
            });
		
		}
		fromDataModel() {
			return {
				id: this.id,
				id_personal: this.id_personal,
				id_estudiante: this.id_estudiante,
				id_curso: this.id_curso,
				anio: this.anio,
				estado:this.estado,
				condicion: this.condicion,
				fecha_registro: this.fecha_registro,
				fecha_programacion: this.fecha_programacion,
				id_promocion: this.promocion?.id,
				promocion: `${this.promocion ? `${this.promocion.nombre} - Cuotas: ${this.promocion.cuotas} - Precio: ${this.promocion.precio}` : 'Sin plan asignado'}`,
				condicioninicial: this.condicioninicial,
				comentario_registro: this.comentario_registro,
				comentario_programacion	: this.comentario_programacion,
				id_user: this.id_user,
				id_sucursal: this.id_sucursal,
				register_by: this.register_by,
				programmed_by: this.programmed_by,
				certificado:this.certificado,
				id_personal: this.personal?.id,
				asesor: `${this.personal?`${this.personal?.apellido_paterno} ${this.personal?.apellido_materno} ${this.personal?.nombres}`:'Sin Asesor'}`,
				id_estudiante: this.estudiante?.id,
				estudiante: `${this.estudiante?.apellido} ${this.estudiante?.nombre} `,
				celular: this.estudiante?.celular,
				correo: this.estudiante?.correo,
				ci: this.estudiante?.ci,
				genero: this.estudiante?.genero,
				fecha_nac: this.estudiante?.fecha_nac,
				id_curso: this.curso?.id,
				curso_nombre:  `${this.curso?.nombre} - ${this.curso?.modalidad} `,
				modalidad:  this.curso?.modalidad,
				id_sucursal: this.curso?.id_sucursal,
				tipo_curso: this.curso?.tipo_curso?.nombre,
				fecha_inicio: this.curso?.fecha_inicio,
				fecha_fin: this.curso?.fecha_fin,
				hora_inicio: this.curso?.hora_inicio,
				cantidad_horas: this.curso?.cantidad_horas,
				dias: this.curso?.dias,
				aula: this.curso?.aula?.nombre,
				asistencias:this.asistencias,
				notas:this.notas,
				moodle:this.moodle,

			};
		}
	}
	registros.init(
		{
			id_personal: DataTypes.INTEGER,
			id_estudiante: DataTypes.INTEGER,
			id_curso: DataTypes.INTEGER,
			anio: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
			moodle: DataTypes.BOOLEAN,
			condicion: DataTypes.STRING,
			fecha_registro: DataTypes.DATE,
			fecha_programacion: DataTypes.DATE,
			id_promocion: DataTypes.INTEGER,
			condicioninicial: DataTypes.STRING,
			comentario_registro: DataTypes.STRING,
			comentario_programacion	: DataTypes.STRING,
			id_user: DataTypes.INTEGER,
			id_sucursal: DataTypes.INTEGER,
			register_by:DataTypes.INTEGER,
			programmed_by:DataTypes.INTEGER,
			programmed_by:DataTypes.INTEGER,
			certificado:DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'registros',
		}
	);
	return registros;
};
