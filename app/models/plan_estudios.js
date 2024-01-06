'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan_estudios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.carreras, {
                            foreignKey: 'id_carrera'
                        }) 
this.belongsTo(models.modulos, {
                            foreignKey: 'id_modulos'
                        }) 
this.hasMany(models.cursos, {
                            foreignKey: 'id_plan_estudio'
                        })
// define association here
    }
  }
  plan_estudios.init({
    id_carrera: DataTypes.INTEGER,
    anio: DataTypes.INTEGER,
    id_modulos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plan_estudios',
  });
  return plan_estudios;
};