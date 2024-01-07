'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class cobranza extends Model {
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
				id_registro: this.id_registro,
				mensualidad: this.mensualidad,
				certificado: this.certificado,
			};
		}
	}
	cobranza.init(
		{
			id_registro: DataTypes.INTEGER,
			mensualidad: DataTypes.TEXT,
			certificado: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: 'cobranza',
		}
	);
	return cobranza;
};
