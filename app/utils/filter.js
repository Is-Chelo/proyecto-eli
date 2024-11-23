const { Op } = require('sequelize');
const { Sequelize } = require('../models');

class Filter {
    static async applyFilter(query, ModelName, include, order) {
        try {
            const { fecha_inicio, fecha_fin } = query;
            let queryWithFilter = [];

            // Manejo de filtros de fecha
            if (fecha_inicio && fecha_fin) {
                const startDate = new Date(fecha_inicio);
                const endDate = new Date(fecha_fin);
                
                queryWithFilter.push({
                    [Op.or]: [
                        {
                            fecha_registro: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            [Op.and]: [
                                Sequelize.literal('fecha_registro IS NULL'),
                                {
                                    fecha_programacion: {
                                        [Op.between]: [startDate, endDate]
                                    }
                                }
                            ]
                        }
                    ]
                });
            } else if (fecha_inicio) {
                queryWithFilter.push({
                    [Op.or]: [
                        {
                            fecha_registro: fecha_inicio
                        },
                        {
                            [Op.and]: [
                                Sequelize.literal('fecha_registro IS NULL'),
                                {
                                    fecha_programacion: fecha_inicio
                                }
                            ]
                        }
                    ]
                });
            } else if (fecha_fin) {
                queryWithFilter.push({
                    [Op.or]: [
                        {
                            fecha_registro: fecha_fin
                        },
                        {
                            [Op.and]: [
                                Sequelize.literal('fecha_registro IS NULL'),
                                {
                                    fecha_programacion: fecha_fin
                                }
                            ]
                        }
                    ]
                });
            }

            // Filtros adicionales
            for (const key in query) {
                if (key !== 'fecha_inicio' && key !== 'fecha_fin') {
                    let value = query[key];
                    if (value === 'true') value = true;
                    else if (value === 'false') value = false;
                    
                    // Si es un filtro exacto, usar igualdad
                    if (key === 'id_personal' || key === 'otro_campo_exacto') {
                        queryWithFilter.push({
                            [key]: value,
                        });
                    } else if (typeof value === 'boolean') {
                        // Comparación exacta para valores booleanos
                        queryWithFilter.push({
                            [key]: value,
                        });
                    } else {
                        // Comparación parcial para otros campos
                        queryWithFilter.push({
                            [key]: {
                                [Op.like]: `%${value}%`
                            }
                        });
                    }
                }
            }

            const result = await ModelName.findAll({
                include: include,
                where: {
                    [Op.and]: queryWithFilter,
                },
                order: order
            });

            return result;
        } catch (error) {
            console.error('Error en el filtro:', error);
            return [];
        }
    }
}

module.exports = Filter;
