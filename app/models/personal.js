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
      this.hasMany(models.cursos, {
        foreignKey: 'id_personal',
      });
    }
    fromDataModel() {
      return {
        id: this.id,
        id_rol: this.id_rol,
        apellido_paterno:this.apellido_paterno,
        apellido_materno:this.apellido_materno,
        nombres:this.nombres,
        personal: `${this.apellido_paterno} ${this.apellido_materno} ${this.nombres}`,
        telefono: this.telefono,
        correo_electronico: this.correo_electronico,
        numero_de_cuenta: this.numero_de_cuenta,
        tipo_de_cuenta: this.tipo_de_cuenta,
        banco: this.banco,
        ci: this.ci,
        carrera_o_curso: this.carrera_o_curso,
        pago_por_hora: this.pago_por_hora,
        fecha_de_nacimiento: this.fecha_de_nacimiento,
        profesion: this.profesion,
        universidad: this.universidad,
        usuario: this.usuario,
        pass: this.pass,
        firts: this.firts,
        id_user: this.id_user,
        id_sucursal: this.id_sucursal,
        genero: this.genero
      };
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
    universidad: DataTypes.STRING,
    usuario: DataTypes.STRING,
    pass: DataTypes.STRING,
    firts: DataTypes.BOOLEAN,
    id_user: DataTypes.INTEGER,
    id_sucursal: DataTypes.INTEGER,
    genero: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'personal',
  });
  return personal;
};