const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const notas_carrerasController = require('../../controllers/api/notas_carrerasController');
router.get('/', notas_carrerasController.index);
router.post(
	'/',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_asigantura', 'El id_asigantura es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_registro_carrera', 'El id_registro es requerido').trim().escape().not().isEmpty(),
	],

	notas_carrerasController.create
);
router.put(
	'/:id',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_asigantura', 'El id_asigantura es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_registro_carrera', 'El id_registro_carrera es requerido').trim().escape().not().isEmpty(),
	],

	notas_carrerasController.update
);
router.get('/:id_registro_carrera', notas_carrerasController.show);
router.delete('/:id', notas_carrerasController.delete);
// router.get('/:id_registro/:id_asignatura', notas_carrerasController.getNotasModulo);

module.exports = router;
