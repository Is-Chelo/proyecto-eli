const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const colorController = require('../../controllers/api/ColorController');
router.get('/', colorController.index);
router.post(
	'/',

	[
		check('id_curso', 'El id_curso es requerido').trim().escape().not().isEmpty(),
		check('fecha', 'El fecha es requerido').trim().escape().not().isEmpty(),
		check('color', 'El color es requerido').trim().escape().not().isEmpty(),
	],

	colorController.create
);
router.put(
	'/:id',

	[
		check('id_curso', 'El id_curso es requerido').trim().escape().not().isEmpty(),
		check('fecha', 'El fecha es requerido').trim().escape().not().isEmpty(),
		check('color', 'El color es requerido').trim().escape().not().isEmpty(),
	],

	colorController.update
);
router.delete('/:id', colorController.delete);
router.get("/modulos", colorController.getModulos);
router.get("/:id_curso", colorController.show);


module.exports = router;
