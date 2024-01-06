'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class asignaturas extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.carreras, {
				foreignKey: 'id_carrera',
			});
			this.belongsTo(models.modulos, {
				foreignKey: 'id_modulo',
			});
			this.belongsTo(models.aulas, {
				foreignKey: 'id_aula',
			});
			// define association here
		}

    
	}
	asignaturas.init(
		{
			id_carrera: DataTypes.INTEGER,
			id_modulo: DataTypes.INTEGER,
			fecha_inicio: DataTypes.DATE,
			fecha_fin: DataTypes.DATE,
			id_personal: DataTypes.INTEGER,
			hora_inicio: DataTypes.STRING,
			dias: DataTypes.STRING,
			encargado: DataTypes.INTEGER,
			modalidad: DataTypes.STRING,
			cantidad_horas: DataTypes.FLOAT,
			id_aula: DataTypes.INTEGER,
			anio: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'asignaturas',
		}
	);
	return asignaturas;
};
