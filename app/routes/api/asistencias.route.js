const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const asistenciasControllerController = require('../../controllers/api/asistenciasController');
router.get('/', asistenciasControllerController.index);
router.post(
	'/',

	[
		check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty(),
		check('fecha', 'El fecha es requerido').trim().escape().not().isEmpty(),
		check('asistencia', 'El asistencia es requerido').trim().escape().not().isEmpty(),
		check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
	],

	asistenciasControllerController.create
);
router.put(
	'/:id',

	[
		check('id_registro', 'El id_registro es requerido').trim().escape().not().isEmpty(),
		check('fecha', 'El fecha es requerido').trim().escape().not().isEmpty(),
		check('asistencia', 'El asistencia es requerido').trim().escape().not().isEmpty(),
		check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
	],

	asistenciasControllerController.update
);
router.delete('/:id', asistenciasControllerController.delete);

router.get("/:id_registro", asistenciasControllerController.getAsistencia);

module.exports = router;
