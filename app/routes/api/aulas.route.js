const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const aulasControllerController = require('../../controllers/api/aulasController');
router.get('/', aulasControllerController.index);
router.post(
	'/',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor boolean : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
	],

	aulasControllerController.create
);
router.put(
	'/:id',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor boolean : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
	],

	aulasControllerController.update
);
router.get('/:id', aulasControllerController.show);
router.delete('/:id', aulasControllerController.delete);

module.exports = router;
