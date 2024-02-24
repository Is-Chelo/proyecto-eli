const express = require('express');
const router = express.Router();
const {validarToken, validarPermisos} = require('../../middlewares/auth');

// * AUTH
router.use('/auth', require('./auth'));

// * Routes Add With generate
// router.use('/tipo_cursos', require('./tipo_cursos.route'));
router.use('/tipo_cursos', [validarToken], require('./tipo_cursos.route'));
router.use('/estudiantes',[validarToken], require('./estudiantes.route'));
router.use('/carreras',[validarToken], require('./carreras.route'));
router.use('/aulas', [validarToken],require('./aulas.route'));
router.use('/modulos',[validarToken], require('./modulos.route'));
router.use('/plan-estudios',[validarToken], require('./plan_estudios.route'));
router.use('/cursos',[validarToken], require('./cursos.route'));
router.use('/registros',[validarToken], require('./registros.route'));
router.use('/programaciones',[validarToken], require('./programaciones.route'));
router.use('/registros-carreras',[validarToken], require('./registros_carreras.route'));
router.use('/notas',[validarToken], require('./notas.route'));
router.use('/notas-carreras',[validarToken], require('./notas_carreras.route'));
router.use('/notas',[validarToken], require('./notas.route'));
router.use('/asignaturas',[validarToken], require('./asignaturas.route'));
router.use('/asistencias',[validarToken], require('./asistencias.route'));
router.use('/asistencias-carreras',[validarToken], require('./asistencias_carreras.route'));
router.use('/personal',[validarToken], require('./personal.route'));
router.use('/cobranzas',[validarToken], require('./cobranzas.route'));
router.use('/roles',[validarToken], require('./roles.route'));
router.use('/promociones',[validarToken], require('./promociones.route'));
router.use('/cobranzas-carreras',[validarToken], require('./cobranzas_carreras.route'));
router.use('/colores',[validarToken], require('./colores.route'));


module.exports = router;
