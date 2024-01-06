'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class aulas extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.cursos, {
				foreignKey: 'id_aula',
			});
			this.hasMany(models.asignaturas, {
				foreignKey: 'id_aula',
			});
			// define association here
		}
	}
	aulas.init(
		{
			nombre: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'aulas',
		}
	);
	return aulas;
};
