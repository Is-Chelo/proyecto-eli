'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class cursos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.aulas, {
				foreignKey: 'id_aula',
			});
			this.belongsTo(models.tipo_cursos, {
				foreignKey: 'id_tipo_curso',
			});
			this.belongsTo(models.modulos, {
				foreignKey: 'id_modulos',
			});
			this.belongsTo(models.plan_estudios, {
				foreignKey: 'id_plan_estudio',
			});
			this.hasMany(models.registros, {
				foreignKey: 'id_curso',
			});
			this.hasMany(models.registros_carreras, {
				foreignKey: 'id_curso',
			});
			this.belongsTo(models.personal, {
				foreignKey: 'id_personal',
			});
			// this.hasMany(models.programacion_modulos, {
            //     foreignKey: 'id_curso',
            //     as: 'programacion_modulos' // Ensure this alias matches the one used in the query
            // });
			
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				nombre: this.nombre,
				modalidad: this.modalidad,
				fecha_inicio: this.fecha_inicio,
				fecha_fin: this.fecha_fin,
				hora_inicio: this.hora_inicio,
				cantidad_horas: this.cantidad_horas,
				dias: this.dias,
				id_modulos: this.id_modulos,
				encargado: this.encargado,
				id_sucursal:this.id_sucursal,
				id_tipo_curso: this.tipo_curso?.id,
				tipo_curso: this.tipo_curso?.nombre,
				id_aula: this.aula?.id,
				aula_nombre: this.aula?.nombre,
				aula_capacidad: this.aula?.capacidad,
				id_docente:this.personal?.id,
				docente: `${this.personal?.nombres} ${this.personal?.apellido_paterno} ${this.personal?.apellido_materno}`
			};
		}
	}
	cursos.init(
		{
			nombre: DataTypes.STRING,
			nombre_corto: DataTypes.STRING,
			grupo: DataTypes.STRING,
			modalidad: DataTypes.STRING,
			fecha_inicio: DataTypes.DATE,
			fecha_fin: DataTypes.DATE,
			hora_inicio: DataTypes.STRING,
			cantidad_horas: DataTypes.STRING,
			dias: DataTypes.STRING,
			id_aula: DataTypes.INTEGER,
			id_personal: DataTypes.INTEGER,
			id_tipo_curso: DataTypes.INTEGER,
			id_modulos: DataTypes.STRING,
			id_plan_estudio: DataTypes.INTEGER,
			encargado: DataTypes.INTEGER,
			id_sucursal: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'cursos',
		}
	);
	return cursos;
};
