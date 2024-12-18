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
				nombre_corto: this.nombre_corto,
				estado: this.estado,
				id_sucursal:this.id_sucursal
			};
		}
	}
	modulos.init(
		{
			nombre: DataTypes.STRING,
			nombre_corto: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
			id_sucursal: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'modulos',
		}
	);
	return modulos;
};
