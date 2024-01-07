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
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('apellido', 'El apellido es requerido').trim().escape().not().isEmpty(),
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('celular', 'El celular es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('celular', 'El celular es requerido').trim().escape().not().isEmpty(),
		check('correo', 'El correo es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('correo', 'El correo es requerido').trim().escape().not().isEmpty(),
		check('ci', 'El ci es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('ci', 'El ci es requerido').trim().escape().not().isEmpty(),
		check('genero', 'El genero es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('genero', 'El genero es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor boolean : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('inscrito', 'El inscrito es requerido').trim().escape().not().isEmpty(),
		// check('image_path', 'El image_path es un string').trim().escape().isString(),
	],

	estudiantesControllerController.create
);
router.put(
	'/:id',

	[
		check('apellido', 'El apellido es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('apellido', 'El apellido es requerido').trim().escape().not().isEmpty(),
		check('nombre', 'El nombre es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('nombre', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('celular', 'El celular es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('celular', 'El celular es requerido').trim().escape().not().isEmpty(),
		check('correo', 'El correo es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('correo', 'El correo es requerido').trim().escape().not().isEmpty(),
		check('ci', 'El ci es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('ci', 'El ci es requerido').trim().escape().not().isEmpty(),
		check('genero', 'El genero es un string').trim().escape().isString(),
		// No existe validacion para el valor max:266 : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('genero', 'El genero es requerido').trim().escape().not().isEmpty(),
		// No existe validacion para el valor boolean : por favor agregue la validacion en el archivo "code-generate/validations/validations.js" ,
		check('inscrito', 'El inscrito es requerido').trim().escape().not().isEmpty(),
		// check('image_path', 'El image_path es un string').trim().escape().isString(),
	],

	estudiantesControllerController.update
);
router.get('/:id', estudiantesControllerController.show);
router.delete('/:id', estudiantesControllerController.delete);

module.exports = router;
