'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class asignaturas extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.carreras, {
				foreignKey: 'id_carrera',
			});
			this.belongsTo(models.modulos, {
				foreignKey: 'id_modulo',
			});
			this.belongsTo(models.aulas, {
				foreignKey: 'id_aula',
			});
			// define association here
		}

		fromDataModel() {
			return {
				id: this.id,
				id_carrera: this.id_carrera,
				id_modulo: this.id_modulo,
				fecha_inicio: this.fecha_inicio,
				fecha_fin: this.fecha_fin,
				id_personal: this.id_personal,
				hora_inicio: this.hora_inicio,
				dias: this.dias,
				encargado: this.encargado,
				modalidad: this.modalidad,
				cantidad_horas: this.cantidad_horas,
				id_aula: this.id_aula,
				anio: this.anio,
				precio_contado: this.precio_contado,
				precio_cuotas: this.precio_cuotas,
				turno: this.turno,
				createdAt: this.createdAt,
				updatedAt: this.updatedAt,
			};
		}
	}
	asignaturas.init(
		{
			id_carrera: DataTypes.INTEGER,
			id_modulo: DataTypes.INTEGER,
			fecha_inicio: DataTypes.DATE,
			fecha_fin: DataTypes.DATE,
			id_personal: DataTypes.INTEGER,
			hora_inicio: DataTypes.STRING,
			dias: DataTypes.STRING,
			encargado: DataTypes.INTEGER,
			modalidad: DataTypes.STRING,
			cantidad_horas: DataTypes.STRING,
			id_aula: DataTypes.STRING,
			anio: DataTypes.INTEGER,
			turno:DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'asignaturas',
		}
	);
	return asignaturas;
};
