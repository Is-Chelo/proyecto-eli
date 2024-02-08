'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class registros extends Model {
		static associate(models) {
			this.belongsTo(models.estudiantes, {
				foreignKey: 'id_estudiante',
			});
			this.belongsTo(models.cursos, {
				foreignKey: 'id_curso',
			});
			this.hasMany(models.programaciones, {
				foreignKey: 'id_registro',
			});
			this.hasMany(models.notas, {
				foreignKey: 'id_registro',
			});
			this.hasMany(models.asistencias, {
				foreignKey: 'id_registro',
			});
		}
	}
	registros.init(
		{
			id_personal: DataTypes.INTEGER,
			id_estudiante: DataTypes.INTEGER,
			id_curso: DataTypes.INTEGER,
			anio: DataTypes.STRING,
			estado: DataTypes.BOOLEAN,
			condicion: DataTypes.STRING,
			fecha_registro: DataTypes.DATE,
			fecha_programacion: DataTypes.DATE,
			id_promocion: DataTypes.INTEGER,
			condicioninicial: DataTypes.STRING,
			comentario_registro: DataTypes.STRING,
			comentario_programacion	: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'registros',
		}
	);
	return registros;
};
