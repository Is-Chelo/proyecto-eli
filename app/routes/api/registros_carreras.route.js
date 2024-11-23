const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const registros_carrerasControllerController = require('../../controllers/api/registros_carrerasController');
router.get('/', registros_carrerasControllerController.index);
router.post(
	'/',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_personal', 'El id_personal es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_estudiante', 'El id_estudiante es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_curso', 'El id_curso es requerido').trim().escape().not().isEmpty(),
		check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
		check('condicion', 'El condicion es requerido').trim().escape().not().isEmpty(),
		check('fecha_registro', 'El fecha_registro es requerido').trim().escape().not().isEmpty(),
		check('fecha_programacion', 'El fecha_programacion es requerido')
			.trim()
			.escape()
			.not()
			.isEmpty(),
		check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
		check('modalidad', 'El modalidad es requerido').trim().escape().not().isEmpty(),
	],

	registros_carrerasControllerController.create
);
router.put(
	'/:id',

	[
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_personal', 'El id_personal es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_estudiante', 'El id_estudiante es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor integer : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('id_curso', 'El id_curso es requerido').trim().escape().not().isEmpty(),
		check('anio', 'El anio es requerido').trim().escape().not().isEmpty(),
		check('estado', 'El estado es requerido').trim().escape().not().isEmpty(),
		check('condicion', 'El condicion es requerido').trim().escape().not().isEmpty(),
		check('fecha_registro', 'El fecha_registro es requerido').trim().escape().not().isEmpty(),
		check('fecha_programacion', 'El fecha_programacion es requerido')
			.trim()
			.escape()
			.not()
			.isEmpty(),
		check('comentario', 'El comentario es requerido').trim().escape().not().isEmpty(),
		check('modalidad', 'El modalidad es requerido').trim().escape().not().isEmpty(),
	],

	registros_carrerasControllerController.update
);
// router.get('/filter', registros_carrerasControllerController.index);
router.get('/lista', registros_carrerasControllerController.getList);
router.get('/:id', registros_carrerasControllerController.show);
router.delete('/:id', registros_carrerasControllerController.delete);


// router.get('/curso/:id_curso', registros_carrerasControllerController.getRegistrosByCurso);
module.exports = router;
