'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class registros_carreras extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.estudiantes, {
				foreignKey: 'id_estudiante',
			});
			this.belongsTo(models.cursos, {
				foreignKey: 'id_curso',
			});
			// define association here
		}
	}
	registros_carreras.init(
		{
			id_personal: DataTypes.INTEGER,
			id_estudiante: DataTypes.INTEGER,
			id_curso: DataTypes.INTEGER,
			anio: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
			condicion: DataTypes.STRING,
			fecha_registro: DataTypes.DATE,
			fecha_programacion: DataTypes.DATE,
			comentario: DataTypes.STRING,
			modalidad: DataTypes.STRING,
			id_promocion: DataTypes.INTEGER,
			id_asignaturas: DataTypes.STRING,
			condicioninicial: DataTypes.STRING,
			comentario_registro: DataTypes.STRING,
			comentario_programacion	: DataTypes.STRING,
			id_sucursal: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'registros_carreras',
		}
	);
	return registros_carreras;
};
