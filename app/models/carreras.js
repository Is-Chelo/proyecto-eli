'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class carreras extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.plan_estudios, {
				foreignKey: 'id_carrera',
			});
			this.hasMany(models.asignaturas, {
				foreignKey: 'id_carrera',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				nombre: this.nombre,
				duracion: this.duracion,
			};
		}
	}
	carreras.init(
		{
			nombre: DataTypes.STRING,
			duracion: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'carreras',
		}
	);
	return carreras;
};
