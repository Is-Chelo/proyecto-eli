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
			
			// define association here
		}
	}
	cursos.init(
		{
			nombre: DataTypes.STRING,
			nombre_corto: DataTypes.STRING,
			anio_turno: DataTypes.STRING,
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
			precio_contado: DataTypes.FLOAT,
			precio_cuotas: DataTypes.FLOAT,
			encargado: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'cursos',
		}
	);
	return cursos;
};
