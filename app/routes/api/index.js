const express = require('express');
const router = express.Router();
const {validarToken, validarPermisos} = require('../../middlewares/auth');

// * AUTH
router.use('/auth', require('./auth'));

// * Routes Add With generate
router.use('/tipo_cursos', require('./tipo_cursos.route'));
router.use('/estudiantes', require('./estudiantes.route'));
router.use('/carreras', require('./carreras.route'));
router.use('/aulas', require('./aulas.route'));
router.use('/modulos', require('./modulos.route'));
router.use('/plan_estudios', require('./plan_estudios.route'));
router.use('/cursos', require('./cursos.route'));
router.use('/registros', require('./registros.route'));
router.use('/programaciones', require('./programaciones.route'));
router.use('/registros_carreras', require('./registros_carreras.route'));
router.use('/notas', require('./notas.route'));
router.use('/asignaturas', require('./asignaturas.route'));
router.use('/asistencias', require('./asistencias.route'));
router.use('/asistencias', require('./asistencias.route'));
router.use('/personal', require('./personal.route'));

module.exports = router;
