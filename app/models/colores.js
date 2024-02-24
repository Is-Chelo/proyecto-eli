'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class colores extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.cursos, {
				foreignKey: 'id_curso',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				id_curso: this.id_curso,
				fecha: this.fecha,
				color: this.color,
			};
		}
	}
	colores.init(
		{
			id_curso: DataTypes.INTEGER,
			fecha: DataTypes.DATE,
			color: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'colores',
		}
	);
	return colores;
};
