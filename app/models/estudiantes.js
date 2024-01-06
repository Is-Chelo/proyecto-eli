'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class estudiantes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.registros, {
				foreignKey: 'id_estudiante',
			});
			this.hasMany(models.registros_carreras, {
				foreignKey: 'id_estudiante',
			});
			// define association here
		}
	}
	estudiantes.init(
		{
			apellido: DataTypes.STRING,
			nombre: DataTypes.STRING,
			celular: DataTypes.STRING,
			correo: DataTypes.STRING,
			ci: DataTypes.STRING,
			genero: DataTypes.STRING,
			inscrito: DataTypes.BOOLEAN,
			image_path: DataTypes.STRING,
			fecha_nac: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'estudiantes',
		}
	);
	return estudiantes;
};
