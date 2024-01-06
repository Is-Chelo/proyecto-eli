'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class module extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// this.hasMany(models.RolModule, {
			// 	foreignKey: 'id_module',
			// });
			this.hasMany(models.role_module, {
				foreignKey: 'id_module',
			});

		}
	}
	module.init(
		{
			name: DataTypes.STRING,
			url: DataTypes.STRING,
			icon: DataTypes.STRING,
			path_front: DataTypes.STRING,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'module',
		}
	);
	return module;
};
