'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.modulos, {
        foreignKey: 'id_modulo'
      })
      this.belongsTo(models.registros, {
        foreignKey: 'id_registro'
      })
      // define association here
    }
    fromDataModel() {
      return {
        id: this.id,
        id_modulo: this.id_modulo,
        id_registro: this.id_registro,
        nota: this.nota
      }
    }
  }
  notas.init({
    id_modulo: DataTypes.INTEGER,
    id_registro: DataTypes.INTEGER,
    nota: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'notas',
  });
  return notas;
};