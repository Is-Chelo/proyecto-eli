'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notas_carreras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
//       this.belongsTo(models.asignaturas, {
//                             foreignKey: 'id_asignatura'
//                         }) 
// this.belongsTo(models.registros_carreras, {
//                             foreignKey: 'id_registro_carrera'
//                         }) 
// define association here
    }
  }
  notas_carreras.init({
    id_asignatura: DataTypes.INTEGER,
    id_registro_carrera: DataTypes.INTEGER,
    casilla:DataTypes.STRING,
    nota: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'notas_carreras',
  });
  return notas_carreras;
};