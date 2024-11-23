'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class programacion_modulos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.cursos, {
				foreignKey: 'id_curso',
				as: 'cursos'  // Ensure this alias matches in the query
			});
			this.belongsTo(models.personal, {
				foreignKey: 'id_personal',
				as: 'personal'  // Ensure this alias matches in the query
			});
			this.belongsTo(models.modulos, {
				foreignKey: 'id_modulo',
			});
		}
		fromDataModel() {
			return {
				id: this.id,
				id_personal: this.id_personal,
				id_curso: this.id_curso,
				id_modulo: this.id_modulo,
				modulo: this.modulo?.nombre,
				id_sucursal: this.id_sucursal,
				fecha_inicio:this.fecha_inicio,
				fecha_fin:this.fecha_fin,
				curso: this.cursos?.nombre,
				modalidad: this.cursos?.modalidad,
				aula_nombre: this.cursos?.aula?.nombre,
				dias: this.cursos?.dias,
				hora_inicio: this.cursos?.hora_inicio,
				cantidad_horas: this.cursos?.cantidad_horas,
				docente: `${this.personal?.nombres} ${this.personal?.apellido_paterno} ${this.personal?.apellido_materno}`,
				createdAt: this.createdAt
			};
		}
	}
	programacion_modulos.init(
		{
			id_personal: DataTypes.INTEGER,
			id_curso: DataTypes.INTEGER,
			id_modulo: DataTypes.INTEGER,
			id_sucursal: DataTypes.INTEGER,
			fecha_inicio: DataTypes.DATE,
			fecha_fin: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'programacion_modulos',
		}
	);
	return programacion_modulos;
};
