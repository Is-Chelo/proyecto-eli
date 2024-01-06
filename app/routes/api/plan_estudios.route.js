const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const plan_estudiosControllerController = require('../../controllers/api/plan_estudiosController');
router.get('/', plan_estudiosControllerController.index);
router.post(
	'/',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_carrera', 'El id_carrera es requerido').trim().escape().not().isEmpty(),
		check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
		check('id_modulos', 'El id_modulos es requerido').trim().escape().not().isEmpty(),
	],

	plan_estudiosControllerController.create
);
router.put(
	'/:id',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_carrera', 'El id_carrera es requerido').trim().escape().not().isEmpty(),
		check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
		check('id_modulos', 'El id_modulos es requerido').trim().escape().not().isEmpty(),
	],

	plan_estudiosControllerController.update
);
router.get('/:id', plan_estudiosControllerController.show);
router.delete('/:id', plan_estudiosControllerController.delete);

module.exports = router;
