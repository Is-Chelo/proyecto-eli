'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class tipo_cursos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.cursos, {
				foreignKey: 'id_tipo_curso',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				nombre: this.nombre,
				estado: this.estado === 0 ? false : true,
			};
		}
	}
	tipo_cursos.init(
		{
			nombre: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'tipo_cursos',
		}
	);
	return tipo_cursos;
};
