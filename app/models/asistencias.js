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
				foreignKey: 'id_registro',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				id_registro: this.id_registro,
				fecha: this.fecha,
				asistencia: this.asistencia,
				comentario: this.comentario,
			};
		}
	}
	asistencias.init(
		{
			id_registro: DataTypes.INTEGER,
			fecha: DataTypes.DATE,
			asistencia: DataTypes.STRING,
			comentario: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'asistencias',
		}
	);
	return asistencias;
};
