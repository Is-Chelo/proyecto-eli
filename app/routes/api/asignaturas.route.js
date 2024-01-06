const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const asignaturasControllerController = require('../../controllers/api/asignaturasController');
router.get('/', asignaturasControllerController.index);
router.post(
	'/',

	[
		check('id_carrera', 'El id_carrera es requerido').trim().escape().not().isEmpty(),
		check('id_modulo', 'El id_modulo es requerido').trim().escape().not().isEmpty(),
		check('fecha_inicio', 'El fecha_inicio es requerido').trim().escape().not().isEmpty(),
		check('fecha_fin', 'El fecha_fin es requerido').trim().escape().not().isEmpty(),
		check('id_personal', 'El id_personal es requerido').trim().escape().not().isEmpty(),
		check('hora_inicio', 'El hora_inicio es requerido').trim().escape().not().isEmpty(),
		check('dias', 'El dias es requerido').trim().escape().not().isEmpty(),
		check('encargado', 'El encargado es requerido').trim().escape().not().isEmpty(),
		check('modalidad', 'El modalidad es requerido').trim().escape().not().isEmpty(),
		check('cantidad_horas', 'El cantidad_horas es requerido').trim().escape().not().isEmpty(),
		check('id_aula', 'El id_aula es requerido').trim().escape().not().isEmpty(),
		check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
	],

	asignaturasControllerController.create
);
router.put(
	'/:id',

	[
		check('id_carrera', 'El id_carrera es requerido').trim().escape().not().isEmpty(),
		check('id_modulo', 'El id_modulo es requerido').trim().escape().not().isEmpty(),
		check('fecha_inicio', 'El fecha_inicio es requerido').trim().escape().not().isEmpty(),
		check('fecha_fin', 'El fecha_fin es requerido').trim().escape().not().isEmpty(),
		check('id_personal', 'El id_personal es requerido').trim().escape().not().isEmpty(),
		check('hora_inicio', 'El hora_inicio es requerido').trim().escape().not().isEmpty(),
		check('dias', 'El dias es requerido').trim().escape().not().isEmpty(),
		check('encargado', 'El encargado es requerido').trim().escape().not().isEmpty(),
		check('modalidad', 'El modalidad es requerido').trim().escape().not().isEmpty(),
		check('cantidad_horas', 'El cantidad_horas es requerido').trim().escape().not().isEmpty(),
		check('id_aula', 'El id_aula es requerido').trim().escape().not().isEmpty(),
		check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
	],

	asignaturasControllerController.update
);
router.get('/:id', asignaturasControllerController.show);
router.delete('/:id', asignaturasControllerController.delete);

module.exports = router;
