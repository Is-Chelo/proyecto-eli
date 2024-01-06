const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const carrerasControllerController = require('../../controllers/api/carrerasController');
router.get('/', carrerasControllerController.index);
router.post(
	'/',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('duracion', 'El duracion es requerido').trim().escape().not().isEmpty(),
	],

	carrerasControllerController.create
);
router.put(
	'/:id',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('duracion', 'El duracion es requerido').trim().escape().not().isEmpty(),
	],

	carrerasControllerController.update
);
router.get('/:id', carrerasControllerController.show);
router.delete('/:id', carrerasControllerController.delete);

module.exports = router;
