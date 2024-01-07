const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const estudiantesControllerController = require('../../controllers/api/estudiantesController');
router.get('/', estudiantesControllerController.index);
router.post(
	'/',

	[
		check('apellido', 'El apellido es un string').trim().escape().isString(),
		check('apellido', 'El apellido es requerido').trim().escape().not().isEmpty(),
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('celular', 'El celular es un string').trim().escape().isString(),
		check('celular', 'El celular es requerido').trim().escape().not().isEmpty(),
		check('correo', 'El correo es un string').trim().escape().isString(),
		check('correo', 'El correo es requerido').trim().escape().not().isEmpty(),
		check('ci', 'El ci es un string').trim().escape().isString(),
		check('ci', 'El ci es requerido').trim().escape().not().isEmpty(),
		check('genero', 'El genero es un string').trim().escape().isString(),
		check('genero', 'El genero es requerido').trim().escape().not().isEmpty(),
		check('inscrito', 'El inscrito es requerido').trim().escape().not().isEmpty(),
	],

	estudiantesControllerController.create
);
router.put(
	'/:id',

	[
		check('apellido', 'El apellido es un string').trim().escape().isString(),
		check('apellido', 'El apellido es requerido').trim().escape().not().isEmpty(),
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('celular', 'El celular es un string').trim().escape().isString(),
		check('celular', 'El celular es requerido').trim().escape().not().isEmpty(),
		check('correo', 'El correo es un string').trim().escape().isString(),
		check('correo', 'El correo es requerido').trim().escape().not().isEmpty(),
		check('ci', 'El ci es un string').trim().escape().isString(),
		check('ci', 'El ci es requerido').trim().escape().not().isEmpty(),
		check('genero', 'El genero es un string').trim().escape().isString(),
		check('genero', 'El genero es requerido').trim().escape().not().isEmpty(),
		check('inscrito', 'El inscrito es requerido').trim().escape().not().isEmpty(),
	],

	estudiantesControllerController.update
);
router.get('/:id', estudiantesControllerController.show);
router.delete('/:id', estudiantesControllerController.delete);

module.exports = router;
