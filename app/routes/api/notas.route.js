const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const notasControllerController = require('../../controllers/api/notasController');
router.get('/', notasControllerController.index);
router.post(
	'/',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_modulo', 'El id_modulo es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty(),
	],

	notasControllerController.create
);
router.put(
	'/:id',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_modulo', 'El id_modulo es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty(),
	],

	notasControllerController.update
);
router.get('/:id_registro', notasControllerController.show);
router.delete('/:id', notasControllerController.delete);
router.get('/:id_registro/:id_modulo', notasControllerController.getNotasModulo);

module.exports = router;
