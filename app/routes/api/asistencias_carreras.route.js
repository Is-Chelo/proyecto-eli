const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const asistenciasCarrerasController = require('../../controllers/api/asistenciasCarrerasController');
router.get('/', asistenciasCarrerasController.index);
router.post(
	'/',

	[
		check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty(),
		check('fecha', 'El fecha es requerido').trim().escape().not().isEmpty(),
		check('asistencia', 'El asistencia es requerido').trim().escape().not().isEmpty(),
		check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
	],

	asistenciasCarrerasController.create
);
router.put(
	'/:id',

	[
		check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty(),
		check('fecha', 'El fecha es requerido').trim().escape().not().isEmpty(),
		check('asistencia', 'El asistencia es requerido').trim().escape().not().isEmpty(),
		check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
	],

	asistenciasCarrerasController.update
);
router.delete('/:id', asistenciasCarrerasController.delete);



module.exports = router;
