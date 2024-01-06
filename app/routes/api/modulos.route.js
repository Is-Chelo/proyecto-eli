const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const modulosControllerController = require('../../controllers/api/modulosController');
router.get('/', modulosControllerController.index);
router.post(
	'/',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor boolean : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
	],

	modulosControllerController.create
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

	modulosControllerController.update
);
router.get('/:id', modulosControllerController.show);
router.delete('/:id', modulosControllerController.delete);

module.exports = router;
