'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class estudiantes extends Model {
		static associate(models) {
			this.hasMany(models.registros, {
				foreignKey: 'id_estudiante',
			});
			this.hasMany(models.registros_carreras, {
				foreignKey: 'id_estudiante',
			});
			this.belongsTo(models.user, {
				foreignKey: 'register_by',
				as: 'registrado_por',
			})
			
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
			id_user: DataTypes.INTEGER,
			id_sucursal:DataTypes.INTEGER,
			register_by: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'estudiantes',
		}
	);
	return estudiantes;
};
