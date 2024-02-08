'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class promociones extends Model {
		
		static associate(models) {
			this.hasMany(models.registros, {
				foreignKey: 'id_promocion',
			});
			// define association here
		}
		fromDataModel() {
			return {
				id: this.id,
				nombre: this.nombre,
				cuotas: this.cuotas,
				certificado: this.certificado,
				descuento: this.descuento,
				prorrateo: this.prorrateo,
				precio:this.precio,
				precio_certificado:this.precio_certificado
				
			};
		}
	}
	promociones.init(
		{
			nombre: DataTypes.STRING,
			cuotas: DataTypes.INTEGER,
			certificado: DataTypes.INTEGER,
			descuento: DataTypes.INTEGER,
			prorrateo: DataTypes.BOOLEAN,
			precio:DataTypes.FLOAT,
			precio_certificado:DataTypes.FLOAT
		},
		{
			sequelize,
			modelName: 'promociones',
		}
	);
	return promociones;
};
