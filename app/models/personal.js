'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  personal.init({
    id_rol: DataTypes.INTEGER,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    nombres: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo_electronico: DataTypes.STRING,
    numero_de_cuenta: DataTypes.STRING,
    tipo_de_cuenta: DataTypes.STRING,
    banco: DataTypes.STRING,
    ci: DataTypes.STRING,
    carrera_o_curso: DataTypes.STRING,
    pago_por_hora: DataTypes.FLOAT,
    fecha_de_nacimiento: DataTypes.DATE,
    profesion: DataTypes.STRING,
    universidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'personal',
  });
  return personal;
};