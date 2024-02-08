'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class asistencias extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.registros, {
				foreignKey: 'id_registro_carrera',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				id_registro_carrera: this.id_registro_carrera,
				id_asignatura: this.id_asignatura,
				fecha: this.fecha,
				asistencia: this.asistencia,
				comentario: this.comentario,
			};
		}
	}
	asistencias.init(
		{
			id_registro_carrera: DataTypes.INTEGER,
			id_asignatura: DataTypes.INTEGER,
			fecha: DataTypes.DATE,
			asistencia: DataTypes.STRING,
			comentario: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'asistencias_carreras',
		}
	);
	return asistencias;
};
