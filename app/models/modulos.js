'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class modulos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.plan_estudios, {
				foreignKey: 'id_modulos',
			});
			this.hasMany(models.cursos, {
				foreignKey: 'id_modulos',
			});
			this.hasMany(models.notas, {
				foreignKey: 'id_modulo',
			});
			this.hasMany(models.asignaturas, {
				foreignKey: 'id_modulo',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				nombre: this.nombre,
				estado: this.estado,
			};
		}
	}
	modulos.init(
		{
			nombre: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'modulos',
		}
	);
	return modulos;
};
