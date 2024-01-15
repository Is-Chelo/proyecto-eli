'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class cobranza_carrera extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

		fromDataModel() {
			return {
				id: this.id,
				id_registro_carrera: this.id_registro_carrera,
				mensualidad: this.mensualidad,
			};
		}
	}
	cobranza_carrera.init(
		{
			id_registro_carrera: DataTypes.INTEGER,
			mensualidad: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: 'cobranzas_carreras',
		}
	);
	return cobranza_carrera;
};
