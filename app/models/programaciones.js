'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class programaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.registros, {
                            foreignKey: 'id_registro'
                        }) 
// define association here
    }
  }
  programaciones.init({
    id_registro: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'programaciones',
  });
  return programaciones;
};