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

		fromDataModel() {
			return {
				id: this.id,
				nombre: this.nombre,
				capacidad: this.capacidad,
				estado: this.estado,
				id_sucursal: this.id_sucursal
			};
		}
	}
	aulas.init(
		{
			nombre: DataTypes.STRING,
			capacidad: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
			id_sucursal: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'aulas',
		}
	);
	return aulas;
};
