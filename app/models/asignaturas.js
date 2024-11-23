'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class asignaturas extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.carreras, {
				foreignKey: 'id_carrera',
			});
			this.belongsTo(models.modulos, {
				foreignKey: 'id_modulo',
			});
			this.belongsTo(models.aulas, {
				foreignKey: 'id_aula',
			});
			this.belongsTo(models.personal, {
				foreignKey: 'id_personal',
			});
		}

		fromDataModel() {
			const safeJsonParse = (str) => {
				try {
					return str ? JSON.parse(str) : null;
				} catch (error) {
					console.error(`Error parsing JSON: ${error.message}`);
					return null;
				}
			};

			const decodeHtmlEntities = (str) => {
				if (typeof str === 'string') {
					return str.replace(/&quot;/g, '"');
				}
				return str;
			};

			return {
				id: this.id,
				id_carrera: this.carrera?.id,  // Verificación añadida
				id_modulo: this.id_modulo,
				modulo: this.modulo?.nombre,  // Verificación añadida
				nombre_corto: this.modulo?.nombre_corto,  // Verificación añadida
				carrera: this.carrera?.nombre,  // Verificación añadida
				anio: this.anio,
				turno: this.turno,
				fecha_inicio: this.fecha_inicio,
				fecha_fin: this.fecha_fin,
				id_docente: this.personal?.id,  // Verificación añadida
				docente: this.personal ? `${this.personal.nombres} ${this.personal.apellido_paterno} ${this.personal.apellido_materno}` : null,
				hora_inicio: safeJsonParse(decodeHtmlEntities(this.hora_inicio)),
				dias: safeJsonParse(decodeHtmlEntities(this.dias)),
				modalidad: this.modalidad,
				cantidad_horas: safeJsonParse(decodeHtmlEntities(this.cantidad_horas)),
				aulas: safeJsonParse(decodeHtmlEntities(this.id_aula)),
				id_aula: this.aula?.id,  // Verificación añadida
				aula_nombre: this.aula?.nombre,  // Verificación añadida
				aula_capacidad: this.aula?.capacidad,  // Verificación añadida
				createdAt: this.createdAt,
				updatedAt: this.updatedAt,
			};
		}


	}
	asignaturas.init(
		{
			id_carrera: DataTypes.INTEGER,
			id_modulo: DataTypes.INTEGER,
			fecha_inicio: DataTypes.DATE,
			fecha_fin: DataTypes.DATE,
			id_personal: DataTypes.INTEGER,
			hora_inicio: DataTypes.STRING,
			dias: DataTypes.STRING,
			modalidad: DataTypes.STRING,
			cantidad_horas: DataTypes.STRING,
			id_aula: DataTypes.STRING,
			anio: DataTypes.INTEGER,
			turno: DataTypes.STRING,
			id_sucursal: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'asignaturas',
		}
	);
	return asignaturas;
};
