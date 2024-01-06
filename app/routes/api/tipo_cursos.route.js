const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const tipo_cursosControllerController = require('../../controllers/api/tipo_cursosController');

router.get('/', tipo_cursosControllerController.index);
router.post(
	'/',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
	],

	tipo_cursosControllerController.create
);
router.put(
	'/:id',

	[
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
	],

	tipo_cursosControllerController.update
);
router.get('/:id', tipo_cursosControllerController.show);
router.delete('/:id', tipo_cursosControllerController.delete);

module.exports = router;
