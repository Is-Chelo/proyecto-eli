'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class role_module extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.module, {
				foreignKey: 'id_module',
			});
			this.belongsTo(models.role, {
				foreignKey: 'id_rol',
			});
		}
	}
	role_module.init(
		{
			id_module: DataTypes.INTEGER,
			id_rol: DataTypes.INTEGER,
			ok_select: DataTypes.BOOLEAN,
			ok_update: DataTypes.BOOLEAN,
			ok_insert: DataTypes.BOOLEAN,
			ok_delete: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'role_module',
		}
	);
	return role_module;
};
